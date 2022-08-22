// react components , hooks
import React, { useEffect, useState } from "react";

// link from react-router-dom to navigate to another route
import { Link, useNavigate } from "react-router-dom";

// import contract through which we can communicate to the blockchain
import Contract from "../Contract";

// bootstrap components
import { Button, Card, ListGroup } from "react-bootstrap";

function DisplayTip({
  currTip,
  isDisplayWholeTip,
  isAdminLoggedIn,
  closeCase,
}) {
  // useNavigate returns a function through which we can route to another route in functions
  const navigate = useNavigate();

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
        // console.log([...prevFeedBacks, feedback]);
        return [...prevFeedBacks, feedback];
      });
    } catch (error) {
      alert("Failed To Add A Feedback");
    }
  }

  return (
    // just rendering a card component to display a tip every time

    <Card>
      <Card.Header>Crime type name : {currTip.crimeType}</Card.Header>

      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item>Date : {date}</ListGroup.Item>
          <ListGroup.Item>City Name : {currTip.location[0]} </ListGroup.Item>
          <ListGroup.Item>
            Crime Location : {currTip.location[0]}
          </ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>

        {isDisplayWholeTip && (
          <>
            <Link
              to="/Tip"
              state={{ currTip: currTip, isAdminLoggedIn: isAdminLoggedIn }}
            >
              <Button variant="primary">Open</Button>
            </Link>
          </>
        )}

        {/* Things to rendered when a user click on a show more button */}

        {!isDisplayWholeTip && (
          <>
            {isSuspectKnown && (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item>
                    Suspect Name : {suspectData.suspectName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Suspect Age : {suspectData.suspectAge}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Suspect Gender : {suspectData.suspectGender}
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
              </>
            )}
            {/* **** if victim is known by tip provider ***** */}
            {isVictimKnown && (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item>
                    Victim Name :{victimData.victimName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Victim Age :{victimData.victimAge}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Victim Gender :{victimData.victimGender}
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
              </>
            )}
            {/* **** if there is any vehicle involved in a crime location ***** */}
            {isVehiclePresent && (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item>
                    Vehicle State :{vehicleData.vehicleState}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Vehicle plate Number :{vehicleData.vehiclePlateNumber}{" "}
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}
            <ListGroup variant="flush">
              <ListGroup.Item> Description : </ListGroup.Item>
              <Card.Text>{currTip.crimeDesc}</Card.Text>
            </ListGroup>
            {feedbacks.length > 0 && (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item> This are the feedbacks : </ListGroup.Item>
                  {feedbacks.map((currFeedBack, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        No {index + 1} : {currFeedBack}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </>
            )}
            {!isAdminLoggedIn ? (
              <form>
                <label htmlFor="feedback">
                  Do You Have Any Information Regarding This :{" "}
                </label>

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
            ) : (
              <h1>Make converstation with the tip provider you are an admin</h1>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/");
              }}
            >
              Show Less
            </Button>{" "}
            {isAdminLoggedIn && (
              // show This Remove Tip button only if the cop is logged in
              <Button
                onClick={() => {
                  closeCase();
                }}
              >
                Delete
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default DisplayTip;
