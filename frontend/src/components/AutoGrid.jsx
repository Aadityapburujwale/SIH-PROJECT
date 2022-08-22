// importing react , react hooks
import React, { useEffect, useState } from "react";

// material ui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// components

// use this component to display the crime / tips 1 by 1
import DisplayTip from "./DisplayTip";

// import contract through which we can communicate to the blockchain
import Contract from "./../Contract";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AutoGrid({ isAdminLoggedIn, isUserConnected }) {
  const [tips, setTips] = useState([]);

  // function to get all the tips
  // this function get execute from useEffect hook whenever a component is loaded
  async function getTips() {
    try {
      if (Contract) {
        const allTips = await Contract.getCrimes();
        console.log(allTips[0]);
        setTips(allTips);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // adding an a event whenever component is loaded for the first time
  useEffect(() => {
    getTips();
  }, [isUserConnected]);

  return (
    <>
      <Grid container justifyContent="center">
        {tips.map((currTip, index) => {
          return (
            <Grid key={index} item xs={10} sm={5} md={5} lg={4} m={1}>
              <DisplayTip
                currTip={currTip}
                isDisplayWholeTip={true}
                isAdminLoggedIn={isAdminLoggedIn}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
