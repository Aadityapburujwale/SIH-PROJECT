// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 < 0.9.0;

contract Crimes{

  struct Crime{
    uint256 crimeId; // Unique Id Number for each crime
    uint256 timeStamp; // TimeStamp in Unix / Epoch

    string crimeType; // Crime Type -> Murder/Theft/Robbery...etc
    string crimeDesc; // Crime Description in detail
    uint8 numberOfSuspects; // Number Of Suspects Seen

     string state; // State Name Where Crime Occured
    string city; // City Name Where Crime Occured

    // Geographical Coordinates
    uint256 latitude; 
    uint256 longitude; 

    // Is person known about whom the crime has been committed?
    bool isVictimKnown;
    string aboutVictim; // Information Of Victim
    
    bool isSuspectKnown; // Do you know who did the crime?
    string aboutSuspect; // Information Of Suspect

    // Case is active or closed [Active = true | Close = false]
    bool isCaseActive;

    uint32 crimeGenuinenessRating; // Genuineness Rating From Feedback Form By Users
    uint32 nUsersWhoDidRating; // Number of users who did rating
    
    /*
      For now mapping it seperatly.    
      address addressOfUserAc; // Wallet Address of who reporting the crime
    */

  }

  Crime[] private crimes; // List Of All Crimes that reported
  
  /* To Show the list of each user's reported crime to their account
     Key   -> crimeId
     Value -> users's Address
  */
  //mapping(uint256 => address) reportedCrimeByUser;

  // Function to submit crime (Storing Crime Details)
  function submitCrime(uint256 _timeStamp,
                       string memory _city,
                       uint256 _latitude,
                       uint256 _longitude,
                       string memory _crimeType,
                       uint8 _numberOfSuspects,
                       string memory _crimeDesc,
                       bool _isVictimKnown,
                       string memory _aboutVictim,
                       bool _isSuspectKnown,
                       string memory _aboutSuspect
                      ) external
  {

    // Mapping unique Crime Id With reporter Account
   // reportedCrimeByUser[crimes.length] = msg.sender;

    Crime memory crime;
    crime.crimeId = crimes.length;
    crime.timeStamp = _timeStamp;

    // Crime Details
    crime.crimeType = _crimeType;
    crime.crimeDesc = _crimeDesc;
    crime.numberOfSuspects = _numberOfSuspects;

    // Crime Location
    crime.city = _city;
    crime.latitude = _latitude;
    crime.longitude = _longitude;

    crime.isVictimKnown = _isVictimKnown;
    crime.aboutVictim = _aboutVictim;
    crime.isSuspectKnown = _isSuspectKnown;
    crime.aboutSuspect = _aboutSuspect;
    crime.isCaseActive = true;
    crime.crimeGenuinenessRating = 0;
    crime.nUsersWhoDidRating = 0;

    // Adding New Crime Report 
    crimes.push(crime);
  }

  // Function to add feedback of reported case.
//   function addFeedback(uint32 _crimeId, string memory _feedback, uint32 _crimeGenuinenessRating) external {

//     uint32 _feedbackId = uint32(crimes[_crimeId].crimeFeedbacks.length);
//     crimes[_crimeId].crimeFeedbacks.push(CrimeFeedback(_feedbackId,_feedback));
//     crimes[_crimeId].crimeGenuinenessRating += _crimeGenuinenessRating;
//     crimes[_crimeId].nUsersWhoDidRating += 1;

//   }

// Function to calculate Crime Genuineness
function calculateGenuineness(uint currRating, uint ratingFromCurrUser, uint totalUsers) external pure returns(uint[] memory){

    uint[] memory ratings = new uint[](2);
    ratings[0] = currRating+ratingFromCurrUser;
    ratings[1] = totalUsers+1;

    return ratings;
    // return ((currRating+ratingFromCurrUser)/(totalUsers+1)) * 5;
}

// TODO: Function To Show Crimes By City


// TODO: Function To Show Nearest Crimes By Latitude & Longitude


// Function for admin to close case.
  function closeCase(uint32 _crimeId) external {
    crimes[_crimeId].isCaseActive = false;
  }

  function getCrimes() public view returns (Crime[] memory) {
       return crimes;
   }

}