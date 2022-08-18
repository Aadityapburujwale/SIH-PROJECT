// react components , hooks
import React, { useEffect, useState } from "react";

// import contract through which we can communicate to the blockchain
import Contract from "../Contract";

// material ui components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DisplayTip({ currTip }) {
  const [isDisplayWholeTip, setIsDisplayWholeTip] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState(currTip.feedbacks);
  const [isVehiclePresent, setIsVehiclePresent] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [isSuspectKnown, setIsSuspectKnown] = useState(false);
  const [suspectData, setSuspectData] = useState([]);
  const [isVictimKnown, setIsVictimKnown] = useState(false);
  const [victimData, setVictimData] = useState([]);

  useEffect(() => {
    if (currTip.isVehiclePresent) {
      setIsVehiclePresent(true);
      setVehicleData(JSON.parse(currTip.vehicleInfoAnswers[0]));
    }

    if (currTip.isVictimKnown) {
      setIsVictimKnown(true);
      setVictimData(JSON.parse(currTip.victimInfoAnswers[0]));
    }

    if (currTip.isSuspectKnown) {
      setIsSuspectKnown(true);
      setSuspectData(JSON.parse(currTip.suspectInfoAnswers[0]));
    }
  }, []);

  // convert date from _hex to Date format
  const unixTime = parseInt(currTip.timeStamp._hex, 16);
  let date = new Date(unixTime);
  date = date.toDateString();

  // this function is used to submit the feedback from the user side
  async function handleSubmitFeedback(e) {
    // prevent default is used to prevent the page from the reloading
    // because event is targetting to the onSubmit of form tag
    e.preventDefault();

    try {
      await Contract.submitFeedback(currTip.crimeId._hex, feedback);

      setFeedback("");
      setFeedbacks((prevFeedBacks) => {
        console.log([...prevFeedBacks, feedback]);
        return [...prevFeedBacks, feedback];
      });
    } catch (error) {
      alert("you denied to add a feedback");
    }
  }

  return (
    // just rendering a card component to display a tip every time

    <Card sx={{ margin: 4 }} key={currTip.crimeId}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong> Date : </strong>
          {date}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Crime Type : </strong>
          {currTip.crimeType}
        </Typography>
        <Typography variant="body2">
          <strong>Crime state : </strong>
          {currTip.location[0]}
        </Typography>
        <Typography variant="body2">
          <strong>Crime City : </strong>
          {currTip.location[1]}
        </Typography>

        <>
          {!isDisplayWholeTip && (
            <CardActions>
              {/* open current tip on another page to give feedback*/}
              <Button
                size="small"
                onClick={() => {
                  setIsDisplayWholeTip(true);
                }}
              >
                Show More
              </Button>
            </CardActions>
          )}
        </>

        {/* Things to rendered when a user click on a show more button */}

        {isDisplayWholeTip && (
          <>
            {/* **** if suspect is known by tip provide ***** */}

            {isSuspectKnown && (
              <>
                <Typography variant="body2">
                  <strong>Suspect Name : </strong>
                  {suspectData.suspectName}
                </Typography>
                <Typography variant="body2">
                  <strong>Suspect Age : </strong>
                  {suspectData.suspectAge}
                </Typography>
                <Typography variant="body2">
                  <strong>Suspect Gender : </strong>
                  {suspectData.suspectGender}
                </Typography>
              </>
            )}

            {/* **** if victim is known by tip provider ***** */}

            {isVictimKnown && (
              <>
                <Typography variant="body2">
                  <strong>Victim Name : </strong>
                  {victimData.victimName}
                </Typography>
                <Typography variant="body2">
                  <strong>Victim Age : </strong>
                  {victimData.victimAge}
                </Typography>
                <Typography variant="body2">
                  <strong>Victim Gender : </strong>
                  {victimData.victimGender}
                </Typography>
              </>
            )}

            {/* **** if there is any vehicle involved in a crime location ***** */}

            {isVehiclePresent && (
              <>
                <Typography variant="body2">
                  <strong>Vehicle State : </strong>
                  {vehicleData.vehicleState}
                </Typography>
                <Typography variant="body2">
                  <strong>Vehicle plate Number : </strong>
                  {vehicleData.vehiclePlateNumber}
                </Typography>
              </>
            )}

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <strong>Description : </strong>
              {currTip.crimeDesc}
            </Typography>

            <Typography variant="body2">
              <strong>lattitude : </strong>
              {currTip.location[2]}
            </Typography>

            <Typography variant="body2">
              <strong>longitude : </strong>
              {currTip.location[3]}
            </Typography>

            {feedbacks.length > 0 && (
              <>
                <p>This are the feedbacks : </p>
                {feedbacks.map((currFeedBack, index) => {
                  return (
                    <Typography variant="body2" key={index}>
                      No {index + 1} : {currFeedBack}
                    </Typography>
                  );
                })}
              </>
            )}

            {/* form to take any feedback for the current tip from the users of that locality */}

            <form>
              <strong>
                <label htmlFor="feedback">
                  Do You Have Any Information Regarding This :{" "}
                </label>
              </strong>
              <br />
              <textarea
                value={feedback}
                id="feedback"
                cols="30"
                rows="4"
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              ></textarea>
              <br />
              <button type="submit" onClick={handleSubmitFeedback}>
                Submit feedback
              </button>
            </form>

            <CardActions>
              {/* open current tip on another page to give feedback*/}
              <Button
                size="small"
                onClick={() => {
                  setIsDisplayWholeTip(false);
                }}
              >
                Show Less
              </Button>
            </CardActions>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DisplayTip;
