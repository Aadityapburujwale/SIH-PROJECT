// react components , hooks
import React from "react";

// link from react-router-dom to navigate to another route
import { Link } from "react-router-dom";

// bootstrap components
import { Button, Card, ListGroup } from "react-bootstrap";

function DisplayMyShortTip({ currTip }) {
  // useNavigate returns a function through which we can route to another route in functions

  const date = getDate();

  // convert date from _hex to Date format

  function getDate() {
    const unixTime = parseInt(currTip.timeStamp._hex, 16);
    let dateOfCrime = new Date(unixTime);
    dateOfCrime = dateOfCrime.toDateString();
    return dateOfCrime;
  }

  return (
    // just rendering a card component to display a tip every time

    <Card>
      <Card.Header>
        Status : {currTip.isCaseActive ? "Active" : "Deactive"}
      </Card.Header>

      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Crime type name : {currTip.crimeType}</ListGroup.Item>
          <ListGroup.Item>Date : {date}</ListGroup.Item>
          <ListGroup.Item>State Name : {currTip.location[0]} </ListGroup.Item>
          <ListGroup.Item>City Name : {currTip.location[1]}</ListGroup.Item>
        </ListGroup>

        <Link to="/MyProfile/MyTip" state={{ currTip: currTip }}>
          <Button variant="primary">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default DisplayMyShortTip;
