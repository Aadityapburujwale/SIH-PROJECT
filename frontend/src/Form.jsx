import React, { useState } from "react";

// import contract through which we can communicate to the blockchain
import Contract from "./Contract";

// components
import MapPicker from "./components/MapPicker";
import { Card, TextField, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// The useNavigate hook returns a function that lets you navigate programmatically,
import { useNavigate } from "react-router-dom";
import FileUploadPage from "./components/FileUploadPage";

const App = () => {
  // useNavigate returns a function through which we can route to another route in functions
  const navigate = useNavigate();

  // states that hold's the data

  const [date, setdate] = useState(new Date());
  const [crimeType, setCrimeType] = useState("");
  //   states to particular part of form have to show or not
  const [suspectRadio, setSuspectRadio] = useState(false);
  const [vehicleInvolved, setVehicleInvolved] = useState(false);
  const [victimInfo, setVictimeInfo] = useState(false);

  //   necessary inputs
  const [crimeDes, setCrimeDes] = useState("");
  const [numberOfSuspects, setNumberOfSuspects] = useState("");

  //   states to handle the suspect information
  const [suspectName, setSuspectName] = useState("");
  const [suspectGender, setSuspectGender] = useState("");
  const [suspectAge, setSuspectAge] = useState("");

  //   states to handle the victim information
  const [victimName, setVictimName] = useState("");
  const [victimGender, setVictimGender] = useState("");
  const [victimAge, setVictimAge] = useState("");

  //   states to handle the vehicle information
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleState, setVehicleState] = useState("");
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState("");

  // This states defined to take the files as input and handle the files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cid, setCid] = useState("");
  const [selectedFileNames, setSelectedFileNames] = useState([]);

  // This states are used to store the location information like , lattitude , longitude , state , city of crime

  const [lat, setLat] = useState(12.8996);
  const [lng, setLng] = useState(80.2209);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  //    *************************************** Submit Tip Function ****************************************88
  //   funtion to submit tip whenever button from the form is triggered

  const submitTip = async (e) => {
    e.preventDefault();

    // checking if user already have submitted the form 3 times for current date

    async function checkCountOfUser() {
      const response = await Contract.checkTipsCountOfUser(
        new Date().toLocaleDateString()
      );

      if (!response) {
        alert("You Have already submitted 3 forms Today");
        return;
      } else {
        // converting current date to the timestamp string
        let currDate = new Date(date);
        currDate = currDate.getTime().toString();

        // regarding suspect
        let suspect = [];
        if (suspectName && suspectRadio) {
          let suspectData = {
            suspectName: suspectName,
            suspectAge: suspectAge,
            suspectGender: suspectGender,
          };
          suspect.push(JSON.stringify(suspectData));
        }

        // regarding victim is known by tip provider
        let victim = [];
        if (victimName && victimInfo) {
          let victimData = {
            victimName: victimName,
            victimeAge: victimAge,
            victimGender: victimGender,
          };
          victim.push(JSON.stringify(victimData));
        }

        // regardin vehicle
        let vehicle = [];
        if (vehicleInvolved) {
          let vehicleData = {
            vehicleState: vehicleState,
            vehiclePlateNumber: vehiclePlateNumber,
          };
          vehicle.push(JSON.stringify(vehicleData));
        }

        // initially ipfs hash is empty
        // if user had provided the media then change the hash to cid
        let ipfsHash = "";
        let fileNames = selectedFileNames;
        if (cid) {
          ipfsHash = cid;
        }

        // set the location here like , lattitude , longitude , state and city

        let location = [stateName, cityName, lat + "", lng + ""];

        try {
          Contract.submitCrime(
            currDate,
            location,
            crimeType,
            [],
            crimeDes,
            suspect, // regarding suspect
            vehicle, // regarding vehicle
            victim, // regarding victim
            ipfsHash, // store ipfs hash here
            fileNames,
            new Date().toLocaleDateString()
          )
            .then((response) => {
              alert("Tip Submitted successfully anonymously");
            })
            .then(() => {
              setdate("");
              setVehicleInvolved("");
              setVictimeInfo("");
              setSuspectRadio(false);
              setCrimeDes("");
              setCrimeType("");
              setNumberOfSuspects("");
            })
            .then(() => {
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }

    await checkCountOfUser();
  };

  //   ************************** return ****************************

  return (
    <>
      {/* <h1>{date}</h1> */}
      <Card
        className="form_data"
        style={{
          alignContent: "center",
          alignItems: "center",
          margin: "2rem 35vh ",
          display: "flex",
          justifyContent: "center",
          color: "White",
        }}
      >
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <div className="data-time">
              <Typography
                style={{ fontSize: 22, color: "white" }}
                variant="subtitle1"
                display="block"
                gutterBottom
              >
                Select Date Of Crime
              </Typography>
              <input
                className="nput"
                max={new Date().toISOString().split("T")[0]}
                type="date"
                onChange={(e) => setdate(e.target.value)}
                style={{
                  width: "50rem",
                  height: "40px",
                  fontSize: "20px",
                }}
                value={date}
              />
            </div>
            <br />

            <Typography
              style={{ fontSize: 25, color: "white" }}
              variant="subtitle1"
              display="block"
              gutterBottom
            >
              Select State and City In Map
            </Typography>
            <div
              className="mappa"
              style={{
                width: "50rem",
                // height: "500px",
                border: "1px solid",
              }}
            >
              <MapPicker
                lat={lat}
                lng={lng}
                setLat={setLat}
                setLng={setLng}
                setCityName={setCityName}
                setStateName={setStateName}
              />
            </div>

            {/* **** type of crime **  */}
            <div
              className="type-of-crime"
              style={{
                width: "50rem",
                // border: "1px solid",
                marginTop: "1rem",
              }}
            >
              {/* <p>What is the type of crime?</p> */}
              <Typography variant="subtitle1" display="block" gutterBottom>
                What is the type of crime?
              </Typography>

              <select
                className="nput"
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
                style={{
                  width: "50rem",
                  height: "40px",
                  fontSize: "16.5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <option value>Select</option>
                <option>Theft</option>
                <option>Drugs</option>
                <option>Murder</option>
                <option>Harassment</option>
              </select>

              {/* {crimeType === "Harassment" ? (
                <h1>Harassment</h1>
              ) : crimeType === "Drugs" ? (
                <h1>Drugs</h1>
              ) : crimeType === "Murder" ? (
                <h3>Murder</h3>
              ) : crimeType === "Theft" ? (
                <h1>Theft</h1>
              ) : null} */}
            </div>
            <br />
            <br />

            {/* descript about crime */}
            <div
              className="description-crime"
              style={{
                marginTop: "-30px",
              }}
            >
              <label htmlFor="crimeDes">
                Enter Information You Have About The Crime Happend :
              </label>
              <br />
              {/* <textarea
                id="crimeDes"
                placeholder="Enter the crime description"
                style={{
                  marginTop: "1rem",
                  width: "50rem",
                  height: "70px",
                }}
                value={crimeDes}
                onChange={(e) => {
                  setCrimeDes(e.target.value);
                }}
              /> */}

              <TextField
                id="crimeDes"
                sx={{
                  marginTop: "1rem",
                  width: "50rem",
                  height: "70px",
                  backgroundColor: "white",
                }}
                label="Enter the crime description"
                value={crimeDes}
                onChange={(e) => {
                  setCrimeDes(e.target.value);
                }}
                multiline
                // rows={2}
                // maxRows={4}
              />
            </div>

            {/* number of suspects information */}
            <div
              style={{
                marginTop: "1rem",
              }}
            >
              {/* <label htmlFor="numberOfSuspects">
                How Many Criminals Are There :{" "}
              </label> */}
              <br />
              <br />
              {/* <input
                type="number"
                id="numberOfSuspects"
                value={numberOfSuspects}
                onChange={(e) => {
                  setNumberOfSuspects(e.target.value);
                }}
              /> */}

              <TextField
                label="How Many Criminals Are There"
                type="number"
                id="numberOfSuspects"
                value={numberOfSuspects}
                onChange={(e) => {
                  setNumberOfSuspects(e.target.value);
                }}
                style={{
                  width: "50rem",
                  height: "50px",
                  fontSize: "20px",
                  marginTop: "-40px",
                  backgroundColor: "white",
                }}
              />
            </div>

            {/* *******************************  suspect **************************************** */}
            {/* Regardin the suspect is acquitance ( suspect is known or not) */}
            <div
              className="suspect"
              style={{
                // border: "1px solid",
                width: "50rem",
                marginTop: "2rem",
              }}
            >
              <p style={{ color: "white" }}>
                Do you have info regarding the Suspect?
              </p>
              <br />

              <FormControl
                style={{
                  marginTop: "-30px",
                }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  // defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    id="suspectInfoYes"
                    name="suspect"
                    value="yes"
                    onChange={(e) => {
                      setSuspectRadio(true);
                    }}
                    control={<Radio />}
                    label="YES"
                  />
                  <FormControlLabel
                    id="suspectInfoNo"
                    name="suspect"
                    value="no"
                    onChange={(e) => setSuspectRadio(false)}
                    control={<Radio />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>

              <br />
              <br />
              {suspectRadio ? (
                <>
                  <TextField
                    id="suspectName"
                    type="text"
                    placeholder="Enter the suspect name"
                    style={{
                      width: "50rem",
                      height: "50px",
                      fontSize: "20px",
                      backgroundColor: "white",
                    }}
                    value={suspectName}
                    onChange={(e) => {
                      setSuspectName(e.target.value);
                    }}
                  />
                  <br />
                  <br />

                  {/* <p>Enter the gender</p> */}

                  <div>
                    <label htmlFor="male">Male</label>
                    <input
                      name="gender"
                      id="male"
                      type="radio"
                      onChange={(e) => {
                        setSuspectGender("Male");
                      }}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                      name="gender"
                      id="female"
                      type="radio"
                      onChange={(e) => {
                        setSuspectGender("Female");
                      }}
                    />
                  </div>

                  {/* <label htmlFor="age">Age Group Of Suspect</label> */}
                  {/* <input
                    type="number"
                    id="age"
                    value={suspectAge}
                    onChange={(e) => {
                      setSuspectAge(e.target.value);
                    }}
                  /> */}
                  <TextField
                    type="number"
                    label="Age Group Of Suspect"
                    //  placeholder="Enter the Age Group Of Suspect"
                    id="age"
                    value={suspectAge}
                    onChange={(e) => {
                      setSuspectAge(e.target.value);
                    }}
                    style={{
                      marginTop: "1rem",
                      width: "50rem",
                      height: "50px",
                      fontSize: "20px",
                      background: "white",
                    }}
                  />
                </>
              ) : null}
            </div>

            {/* ***** if there is any vehicle involved in a crime location ***** */}

            <div
              className="vehicle-involved"
              style={{
                // border: "1px solid",
                width: "50rem",
                marginTop: "2rem",
              }}
            >
              <p style={{ color: "white" }}>
                Is There any vehicle involved in crime?
              </p>
              <input
                type="radio"
                name="vehicle"
                value="yes"
                onChange={(e) => setVehicleInvolved(true)}
              />
              Yes
              <input
                type="radio"
                name="vehicle"
                value="no"
                onChange={(e) => setVehicleInvolved(false)}
              />
              No
              <br />
              <br />
              {vehicleInvolved && (
                <>
                  <div
                    id="hre"
                    style={{
                      // marginRight:"auto",
                      // marginLeft:"auto"
                      background: "white",
                    }}
                  >
                    <p>What is the type of vehicle?</p>

                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      style={{
                        alignItems: "center",
                        width: "40rem",
                        height: "40px",
                        fontSize: "16.5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <option value>Select</option>
                      <option>Bike</option>
                      <option>ForWheeler</option>
                      <option>Truck</option>
                    </select>
                    <br />

                    {/* <label htmlFor="vehicleState">
                    Enter Passing State Of Vehicle :{" "}
                  </label>
                  <input
                    type="text"
                    value={vehicleState}
                    id="vehicleState"
                    onChange={(e) => setVehicleState(e.target.value)}
                  /> */}
                    <TextField
                      label="Enter Passing State Of Vehicle"
                      type="text"
                      value={vehicleState}
                      id="vehicleState"
                      onChange={(e) => setVehicleState(e.target.value)}
                      style={{
                        width: "40rem",
                        height: "40px",
                        fontSize: "16.5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                    <br />

                    {/* <label htmlFor="vehiclePlateNumber">
                    Enter Plate Number of Vehicle :{" "}
                  </label>

                  <input
                    id="vehiclePlateNumber"
                    type="number"
                    placeholder="Enter the License Plate No"
                    style={{
                      width: "40rem",
                      height: "40px",
                      fontSize: "20px",
                      marginTop: "1rem",
                    }}
                    value={vehiclePlateNumber}
                    onChange={(e) => {
                      setVehiclePlateNumber(e.target.value);
                    }}
                  /> */}
                    <TextField
                      label="Enter Plate Number of Vehicle"
                      id="vehiclePlateNumber"
                      type="number"
                      placeholder="Enter the License Plate No"
                      style={{
                        width: "40rem",
                        height: "40px",
                        fontSize: "20px",
                        // marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                      value={vehiclePlateNumber}
                      onChange={(e) => {
                        setVehiclePlateNumber(e.target.value);
                      }}
                    />
                    <br />
                  </div>
                </>
              )}
            </div>

            {/* *******************************  victim **************************************** */}
            {/* Regardin the victim is acquitance ( victim is known or not) */}

            <div
              className="victim-info"
              style={{
                // border: "1px solid",
                width: "50rem",
                marginTop: "0.8rem",
              }}
            >
              <p style={{ color: "white" }}>Victim Known?</p>
              <input
                type="radio"
                name="victim"
                value="yes"
                onChange={(e) => setVictimeInfo(true)}
              />
              Yes
              <input
                type="radio"
                name="victim"
                value="no"
                onChange={(e) => setVictimeInfo(false)}
              />
              No
              <br />
              <br />
              {victimInfo && (
                <>
                  <input
                    type="text"
                    placeholder="Enter Name of victim"
                    style={{
                      width: "40rem",
                      height: "40px",
                      fontSize: "20px",
                    }}
                    value={victimName}
                    onChange={(e) => {
                      setVictimName(e.target.value);
                    }}
                  />

                  <br />

                  <p>Enter the gender of victim</p>

                  <div>
                    <label htmlFor="male">Male</label>
                    <input
                      name="gender"
                      id="male"
                      type="radio"
                      onChange={(e) => {
                        setVictimGender("Male");
                      }}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                      name="gender"
                      id="female"
                      type="radio"
                      onChange={(e) => {
                        setVictimGender("Female");
                      }}
                    />
                  </div>

                  <label htmlFor="age">Age Group Of Victim</label>
                  <input
                    type="number"
                    id="age"
                    value={victimAge}
                    onChange={(e) => {
                      setVictimAge(e.target.value);
                    }}
                  />
                </>
              )}
            </div>

            <div
              className="media-file"
              style={{
                // border: "1px solid",
                width: "50rem",
                marginTop: "0.8rem",
                height: "5rem",
              }}
            >
              {/* form to take inputs as files */}

              <FileUploadPage
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setCid={setCid}
                selectedFileNames={selectedFileNames}
                setSelectedFileNames={setSelectedFileNames}
              />
            </div>

            <div
              className="submit-btn"
              style={{
                // border: "1px solid",
                width: "50rem",
                marginTop: "1rem",
                height: "3rem",
                marginBottom: "1rem",
              }}
            >
              {/* button to submit the tip  */}
              <Button
                variant="contained"
                size="large"
                type="submit"
                style={{
                  // display: "flex",
                  margin: "auto",
                  // padding: "5px",
                }}
                onClick={submitTip}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

export default App;
