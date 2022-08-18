import React, { useState } from "react";
// import RobberyQue from "./RobberyQue";

// import contract through which we can communicate to the blockchain
import Contract from "./Contract";

// The useNavigate hook returns a function that lets you navigate programmatically,
import { useNavigate } from "react-router-dom";

const App = () => {
  // useNavigate returns a function through which we can route to another route in functions
  const navigate = useNavigate();

  const [date, setdate] = useState(new Date());
  const [crimeType, setCrimeType] = useState("");
  //   states to particular part of form have to show or not
  const [suspectRadio, setSuspectRadio] = useState(false);
  const [vehicleInvolved, setVehicleInvolved] = useState(false);
  const [victimInfo, setVictimeInfo] = useState(false);

  //   necessary inputs
  const [crimeDes, setCrimeDes] = useState("");
  const [numberOfSuspects, setNumberOfSuspects] = useState("");
  const [location, setLocation] = useState([
    "Maharashtra",
    "jalgaon",
    "34.5353",
    "53.5225",
  ]);

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

  //    *************************************** Submit Tip Function ****************************************88
  //   funtion to submit tip whenever button from the form is triggered

  const submitTip = async (e) => {
    e.preventDefault();

    // converting current date to the timestamp string
    let currDate = new Date(date);
    currDate = currDate.getTime().toString();

    // regarding suspect
    let suspect = [];
    if (suspectName && suspectRadio) {
      console.log("it's inside");
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
        "some ipfs hash here"
      )
        .then(() => {
          alert("Tip Submitted successfully anonymously");
        })
        .then(() => {
          // set all the states to be the empty / set all the form fields to be empty when tip is submitted
          setdate("");
          //   setCrimeLocation("");
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
  };

  //   ************************** return ****************************

  return (
    <>
      {/* <h1>{date}</h1> */}
      <section
        className="form_data"
        style={{
          alignContent: "center",
          alignItems: "center",
          margin: "1rem",
          //  display:"flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="data-time">
              <input
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

            <p>Select State and City In Map</p>
            <div
              className="map-content"
              style={{
                width: "50rem",
                height: "20rem",
                border: "1px solid",
              }}
            ></div>

            {/* **** type of crime **  */}
            <div
              className="type-of-crime"
              style={{
                width: "50rem",
                border: "1px solid",
                marginTop: "1rem",
              }}
            >
              <p>What is the type of crime?</p>

              <select
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
                style={{
                  width: "300px",
                  height: "35px",
                  fontSize: "16.5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <option value>Select</option>
                <option>Robbery</option>
                <option>CyberCr ime</option>
                <option>Burglary</option>
              </select>

              {crimeType === "CyberCrime" ? (
                <h1>cyber</h1>
              ) : crimeType === "Robbery" ? (
                <h1>robbery</h1>
              ) : crimeType === "Burglary" ? (
                <h3>burglary</h3>
              ) : null}
            </div>
            <br />
            <br />

            {/* descript about crime */}
            <div className="description-crime">
              <label htmlFor="crimeDes">
                Enter Information You Have About The Crime Happend :
              </label>
              <br />
              <textarea
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
              />
            </div>

            {/* number of suspects information */}
            <div>
              <label htmlFor="numberOfSuspects">
                How Many Criminals Are There :{" "}
              </label>
              <br />
              <br />
              <input
                type="number"
                id="numberOfSuspects"
                value={numberOfSuspects}
                onChange={(e) => {
                  setNumberOfSuspects(e.target.value);
                }}
              />
            </div>

            {/* *******************************  suspect **************************************** */}
            {/* Regardin the suspect is acquitance ( suspect is known or not) */}
            <div
              className="suspect"
              style={{
                border: "1px solid",
                width: "50rem",
                marginTop: "0.7rem",
              }}
            >
              <p>Do you have info regarding the Suspect?</p>
              <br />
              <input
                id="suspectInfoYes"
                type="radio"
                name="suspect"
                value="yes"
                onChange={(e) => {
                  setSuspectRadio(true);
                }}
              />
              <label htmlFor="suspectInfoYes">Yes</label>
              <input
                id="suspectInfoNo"
                type="radio"
                name="suspect"
                value="no"
                onChange={(e) => setSuspectRadio(false)}
              />
              <label htmlFor="suspectInfoNo">No</label>
              <br />
              <br />
              {suspectRadio ? (
                <>
                  <label htmlFor="suspectName">Suspect Name : </label>
                  <input
                    id="suspectName"
                    type="text"
                    placeholder="Enter the name"
                    style={{
                      width: "40rem",
                      height: "40px",
                      fontSize: "20px",
                    }}
                    value={suspectName}
                    onChange={(e) => {
                      setSuspectName(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <p>Enter the gender</p>

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

                  <label htmlFor="age">Age Group Of Suspect</label>
                  <input
                    type="number"
                    id="age"
                    value={suspectAge}
                    onChange={(e) => {
                      setSuspectAge(e.target.value);
                    }}
                  />
                </>
              ) : (
                "."
              )}
            </div>

            {/* ***** if there is any vehicle involved in a crime location ***** */}

            <div
              className="vehicle-involved"
              style={{
                border: "1px solid",
                width: "50rem",
                marginTop: "0.8rem",
              }}
            >
              <p>Is There any vehicle involved in crime?</p>
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
                  <p>What is the type of vehicle?</p>

                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    style={{
                      width: "300px",
                      height: "35px",
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

                  <label htmlFor="vehicleState">
                    Enter Passing State Of Vehicle :{" "}
                  </label>
                  <input
                    type="text"
                    value={vehicleState}
                    id="vehicleState"
                    onChange={(e) => setVehicleState(e.target.value)}
                  />
                  <br />

                  <label htmlFor="vehiclePlateNumber">
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
                  />
                  <br />
                </>
              )}
            </div>

            {/* *******************************  victim **************************************** */}
            {/* Regardin the victim is acquitance ( victim is known or not) */}

            <div
              className="victim-info"
              style={{
                border: "1px solid",
                width: "50rem",
                marginTop: "0.8rem",
              }}
            >
              <p>Victim Known?</p>
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

            {/* attach an a media file from the below */}
            <div
              className="media-file"
              style={{
                border: "1px solid",
                width: "50rem",
                marginTop: "0.8rem",
                height: "5rem",
              }}
            >
              <input type="file" />
            </div>

            <div
              className="submit-btn"
              style={{
                // border: "1px solid",
                width: "50rem",
                marginTop: "1rem",
                height: "3rem",
              }}
            >
              {/* button to submit the tip  */}
              <button
                type="submit"
                style={{
                  display: "flex",
                  margin: "auto",
                  padding: "5px",
                }}
                onClick={submitTip}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default App;
