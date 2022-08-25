import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// react components , hooks
import React, { useEffect, useState } from "react";

// link from react-router-dom to navigate to another route
import { useNavigate } from "react-router-dom";

// import contract through which we can communicate to the blockchain
import Contract from "../Contract";

// bootstrap components
import { Button, Card, ListGroup } from "react-bootstrap";

export default function DisplayTip({ currTip, isAdminLoggedIn, closeCase }) {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState(currTip.feedbacks);

  const [isVehiclePresent, setIsVehiclePresent] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);

  const [isSuspectKnown, setIsSuspectKnown] = useState(false);
  const [suspectData, setSuspectData] = useState([]);

  const [isVictimKnown, setIsVictimKnown] = useState(false);
  const [victimData, setVictimData] = useState([]);

  const [isTipIsOfCurrentUser, setIsTipIsOfCurrentUser] = useState(false);
  const [isMediaPresent, setIsMediaPresent] = useState(true);

  useEffect(() => {
    // if vehicle present then and then only show vehicle related information
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

    // check if media is availabel for current tip or not
    if (currTip.fileNames.length > 0) {
      setIsMediaPresent(true);
    }

    async function checkTipIsOfUser() {
      const currentReporterAddress = await Contract.getReporterWalletAddress();

      if (currentReporterAddress === currTip.reporterWalletAddress) {
        setIsTipIsOfCurrentUser(true);
      }
    }

    checkTipIsOfUser();
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

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Details" value="1" />
            <Tab label="Media" value="2" />
            <Tab label="Feedbacks" value="3" />
            <Tab label="Crime Location" value="4" />
            {isAdminLoggedIn && <Tab label="Conversation" value="5" />}
          </TabList>
        </Box>
        <TabPanel value="1">
          <>
            <Card>
              <Card.Header>Status : {currTip.isActive}</Card.Header>

              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item>
                    Crime Name : {currTip.crimeType}
                  </ListGroup.Item>
                  <ListGroup.Item>Date : {date}</ListGroup.Item>
                  <ListGroup.Item>
                    City Name : {currTip.location[0]}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Crime Location : {currTip.location[0]}
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
                {/* Things to rendered when a user click on a show more button */}
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
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (isAdminLoggedIn) {
                      navigate("/AdminHome");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  Show Less
                </Button>{" "}
                {isAdminLoggedIn && (
                  // show This Remove Tip button only if the cop is logged in
                  <Button
                    variant="danger"
                    onClick={() => {
                      closeCase();
                    }}
                  >
                    Close Case
                  </Button>
                )}
              </Card.Body>
            </Card>
          </>
        </TabPanel>
        <TabPanel value="2">
          {isMediaPresent ? (
            currTip.fileNames.map((fileName, index) => {
              // url is passed as src of every file in

              return (
                <img
                  src={`https://${currTip.ipfsHash}.ipfs.w3s.link/${fileName}`}
                  alt="Tip Image"
                  key={index}
                  style={{ width: "auto" }}
                />
              );
            })
          ) : (
            <h1>don't have any media</h1>
          )}
        </TabPanel>

        <TabPanel value="3">
          <>
            {feedbacks.length > 0 ? (
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
            ) : (
              <h1>Don't Have Any Feedbacks</h1>
            )}
            {!isTipIsOfCurrentUser && !isAdminLoggedIn && (
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
            )}
          </>
        </TabPanel>

        <TabPanel value="4">
          <h1>display crime location here</h1>
        </TabPanel>

        {isAdminLoggedIn && <TabPanel value="5"></TabPanel>}
      </TabContext>
    </Box>
  );
}
