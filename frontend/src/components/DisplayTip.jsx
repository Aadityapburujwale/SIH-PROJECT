// react components , hooks
import React, { useState } from "react";

// material ui components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DisplayTip({ currTip }) {
  const [isDisplayWholeTip, setIsDisplayWholeTip] = useState(false);

  return (
    // just rendering a card component to display a tip every time

    <Card sx={{ margin: 4 }} key={currTip.crimeId}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <strong>Crime Type : </strong>
          {currTip.crimeType}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong> Number of suspects : </strong>
          {currTip.numberOfSuspects}
        </Typography>
        <Typography variant="body2">
          <strong>Crime location : </strong>
          {currTip.city}
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
                Learn More
              </Button>
            </CardActions>
          )}
        </>

        {isDisplayWholeTip && (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <strong>Description : </strong>
              {currTip.crimeDesc}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <strong> Have Any feedback : </strong>
              <input type="text" name="" id="" />
            </Typography>
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
