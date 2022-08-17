// react module , hooks
import React, { useState } from "react";

// import contract through which we can communicate to the blockchain
import Contract from "./Contract";

export default function Form() {
  const [crimeLocation, setCrimeLocation] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [numberOfSuspects, setNumberOfSuspects] = useState("");
  const [crimeDes, setCrimeDes] = useState("");

  // submitTip is a function which trigger when user clicks on a submit button of a form
  const submitTip = async (e) => {
    e.preventDefault();

    let crimeId = 456;
    let lattitude = 34553;
    let longitude = 32555;

    try {
      Contract.submitCrime(
        crimeId,
        crimeLocation,
        lattitude,
        longitude,
        crimeType,
        numberOfSuspects,
        crimeDes,
        0,
        "NA",
        0,
        "NA"
      )
        .then(() => {
          alert("Tip Submitted successfully anonymously");
        })
        .then(() => {
          setCrimeLocation("");
          setCrimeDes("");
          setCrimeType("");
          setNumberOfSuspects(0);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Form To Take Tipps</h1>
      <form onSubmit={submitTip} style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="crime description"
          value={crimeDes}
          onChange={(e) => {
            setCrimeDes(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="crimeType"
          value={crimeType}
          onChange={(e) => {
            setCrimeType(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="crimelocation"
          value={crimeLocation}
          onChange={(e) => {
            setCrimeLocation(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="number of suspects"
          value={numberOfSuspects}
          onChange={(e) => {
            setNumberOfSuspects(e.target.value);
          }}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

// create a new component in which this fields are accepted or create function here as submit tip and make fields that are not inserted as null

// Tips.defaultProps = {
//   here we can the fields if the fields are not specified
// };
