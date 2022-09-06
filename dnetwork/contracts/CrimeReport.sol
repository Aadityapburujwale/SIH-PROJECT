pragma solidity >= 0.7.0 < 0.9.0;


contract CrimeReport{

/* Array Of Feedback in another stuct not supported yet.
    struct Feedback{

        // Wallet Address who submitted Feedback
         address feebdbackFrom;

        // Feedback
        string feedback;

        // Feedback Time
        // uint256 timestamp;
    }

    */

    // Conversation Model
    struct MESSAGE{
        // uint256 id;
        string from;
        string message;
    }

    struct Crime{

        // Unique Id Number for each crime
        uint256 crimeId;

        // Wallet Address who submitted crime details
        address reporterWalletAddress;

        // TimeStamp in Unix / Epoch
        uint256 timeStamp;

        /*
        // State Name Where Crime Occured
        string state; 

        // City Name Where Crime Occured
        string city; 

        // Geographical Coordinates
        string latitude; 
        string longitude; 
        */

        string[] location;

        // Crime Type -> Murder/Theft/Robbery...etc
        string crimeType;

        /* Questionnaire regarding crime type and mapping it to answer.
           Question_Number -> Answer
           mapping(uint32 => string) questionnaires;
        */
        
        /*  Use This if Above Mapping doesn't work 

        // Questionnaire regarding crime type */
        //string[] questionnaires;

        // Answers of Questionnaire.
        string[] questionnaireAnswers;

        

        // Crime Description in detail
        string crimeDesc; 

        /* Details regarding suspect
            KEY         -> VALUE
            Name        -> name_of_suspect
            Age_Group   -> Young Adult(Below 30) | Middle-aged Adult(Below 60) | Old Adults(Above 60)
            Gender      -> Male | Female
            Description -> Other Details to identify suspects (eg.Face color, hair color, height... etc)

        mapping(string => string) suspectInfo;
        */
        bool isSuspectKnown;
        string[] suspectInfoAnswers;

        /* Details regarding vehicle if any involved in case
            KEY -> VALUE
            License plate state , Number, Vehicle color.. etc.
            mapping(string => string) vehicleInfo;
        */
        bool isVehiclePresent;
        string[] vehicleInfoAnswers;
        

        /* Victim Details if known
            KEY -> VALUE
            Name, address... etc.
            mapping(string => string) victimInfo;
        */
        bool isVictimKnown;
        string[] victimInfoAnswers;

        // IPFS Hash If any media files attached.
        string ipfsHash;

        // input file names
        string[] fileNames;

        // Feedbacks
        string[] feedbacks;

        // Case is active or closed [Active = true | Close = false]
        bool isCaseActive; 
        
        /*
            KEY = ADMIN | USER
            Value = MESSAGE
        */

    }

    // Statistics Model

    struct Statistics{
        uint16 murderCases;
        uint16 theftCases;
	    uint16 drugsCases;
	    uint16 harassmentCases;
    }

    struct StateCases{
        uint16 maharashtraCases;
        uint16 tamilnaduCases;
        uint16 pondicherryCases;
        uint16 uttarPradeshCases;
    }

    // mapping(string=>mapping(address=>uint8)) countTipsPerDay;
    mapping(address=>mapping(string=>uint8)) public countTipsPerDay;


    StateCases stateCases;
    // active cases counter 
    uint16 totalActiveCases;

    // Crime ID Wise Comversation
    mapping(uint256 => MESSAGE[]) private conversations;

    // List Of All Crimes that reported
    Crime[] private crimes;
    Statistics private stats;
    // Stores all crimes user wise.
    mapping(address => Crime[]) crimesByUsers;

    // Store all crimes of city
    mapping(string => Crime[]) crimesOfCity;

    // Function to submit crime (Storing Crime Details)
    function submitCrime(uint256 _timestamp,
                         string[] memory _location,
                         string memory _crimeType,
                         string[] memory _questionnaireAnswers,
                         string memory _crimeDesc,
                         string[] memory _suspectInfoAnswers,
                         string[] memory _vehicleInfoAnswers,
                         string[] memory _victimInfoAnswers,
                         string memory _ipfsHash,
                         string[] memory _fileNames,
                         string memory _date
                        ) external returns(bool){


         Crime memory crime;     
         crime.crimeId = crimes.length;   
         crime.reporterWalletAddress = getReporterWalletAddress();
         crime.timeStamp = _timestamp;   
         crime.location = _location;
         crime.crimeType = _crimeType;     
         crime.questionnaireAnswers = _questionnaireAnswers;
         crime.crimeDesc = _crimeDesc; 
         crime.isCaseActive = true;
         
         crime.isSuspectKnown = false;
         if(_suspectInfoAnswers.length>0){
             crime.isSuspectKnown = true;
             crime.suspectInfoAnswers = _suspectInfoAnswers;
         }

         crime.isVehiclePresent = false;
         if(_vehicleInfoAnswers.length>0){
             crime.isVehiclePresent = true;
             crime.vehicleInfoAnswers = _vehicleInfoAnswers;
         }

         crime.isVictimKnown = false;
         if(_victimInfoAnswers.length>0){
             crime.isVictimKnown = true;
             crime.victimInfoAnswers = _victimInfoAnswers;
         }

        crime.ipfsHash = _ipfsHash;
        crime.fileNames = _fileNames;
        string[] memory _feedbacks;
        crime.feedbacks = _feedbacks;
        crimes.push(crime);

        crimesByUsers[msg.sender].push(crime);
        crimesOfCity[_location[1]].push(crime);

        if(equal(_crimeType,"Murder")){
            stats.murderCases++;
        }else if(equal(_crimeType,"Theft")){
            stats.theftCases++;
        }else if(equal(_crimeType,"Drugs")){
            stats.drugsCases++;
        }else if(equal(_crimeType,"Harassment")){
		stats.harassmentCases++;
        }

        if(equal(_location[0],"Maharashtra")){
            stateCases.maharashtraCases++;
        }else if(equal(_location[0],"Uttar Pradesh")){
            stateCases.uttarPradeshCases++;
        }else if(equal(_location[0],"Pondicherry")){
            stateCases.pondicherryCases++;
        }else if(equal(_location[0],"Tamil Nadu")){
		stateCases.tamilnaduCases++;
	    }

    totalActiveCases++;
    countTipsPerDay[msg.sender][_date] = countTipsPerDay[msg.sender][_date] + 1;

        return true;
    }


    // Function to submit Feedbacks
    function submitFeedback(uint256 _crimeId,string memory _feedback) external{
        crimes[_crimeId].feedbacks.push(_feedback);
    }

    // Return Feedbacks By CrimeID
   function getFeedbacksById(uint256 _crimeId) public view returns(string[] memory){
       return crimes[_crimeId].feedbacks;
   }

    // Function to return all crime to admin side
    function getCrimes() public view returns (Crime[] memory) {
       return crimes;
   }

   // Return Crime By CrimeID
   function getCrimeById(uint256 _crimeId) public view returns(Crime memory){
       return crimes[_crimeId];
   }

    // Returns Total Number Of Crimes
    function totalCrimes() public view returns (uint256) {
       return crimes.length;
   }

    // Returns Address of wallet who Reporting the crime
    function getReporterWalletAddress() public view returns(address){
        return msg.sender;
    }

    // Return Crimes Submitted by the current user
   function getCrimeOfCurrentUser() public view returns(Crime[] memory){
        return crimesByUsers[msg.sender];
   }

    // Return Crimes of city
   function getCrimeOfCity(string memory _city) public view returns(Crime[] memory){
        return crimesOfCity[_city];
   }

   // Function for admin to close case.
  function closeCase(uint32 _crimeId) public {
    totalActiveCases--;
    crimes[_crimeId].isCaseActive = false;
  }

  // Conversation of admin to crime reporter.
  function sendMessage(uint256 _crimeId,string memory _message, string memory _from) public{
      MESSAGE memory currMessage;
      currMessage.message = _message;
      currMessage.from = _from;
      conversations[_crimeId].push(currMessage);
  }

  // Get Conversation of admin & crime reporter.
  function getMessages(uint256 _crimeId)  public view returns(MESSAGE[] memory){
     return conversations[_crimeId];
  }

  // Get crime Statistics
  function getCrimeStatistics() public view returns(Statistics memory) {
      return (stats);
  }
 
 // Get get Active Deative Cases 
    function getActiveDeativeCases() public view returns(uint16,uint16){
    return (totalActiveCases,uint16(totalCrimes()-totalActiveCases));
 }

  // Get crime Statistics of states
  function getStateStatistics() public view returns(StateCases memory) {
      return (stateCases);
  }


  function compare(string memory _a, string memory _b) public pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
     
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }

    function equal(string memory _a, string memory _b) public pure returns (bool) {
        return compare(_a, _b) == 0;
    }


    function checkTipsCountOfUser(string memory _date)public view returns(bool){
        if(countTipsPerDay[msg.sender][_date] >=3){
            return false;
        }else{
            return true;
        }
    }
    
}


/*
    Parameters For Testing

    1660627677,["Maharashtra","Jalgaon","2.9454465","9.2487554"],Theft,["Bike"],"I saw the person stealing bike and going to Shiv Colony side",[],[],[],"IFPS_HASH_HERE"

*/