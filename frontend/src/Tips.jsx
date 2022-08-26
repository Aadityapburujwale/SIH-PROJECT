// importing react , react hooks
import React, { useEffect, useState } from "react";

// material ui
import Grid from "@mui/material/Grid";

// components

// use this component to display the crime / tips 1 by 1
import DisplayShortTip from "./components/DisplayShortTip";

// import contract through which we can communicate to the blockchain
import Contract from "./Contract";

export default function AutoGrid({ isAdminLoggedIn, isUserConnected }) {
  const [tips, setTips] = useState([]);

  // adding an a event whenever component is loaded for the first time
  useEffect(() => {
    // function to get all the tips
    // this function get execute from useEffect hook whenever a component is loaded
    async function getTips() {
      try {
        if (Contract) {
          const allTips = await Contract.getCrimes();
          setTips(allTips);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getTips();
  }, [isUserConnected]);

  return (
    <>
      <Grid container justifyContent="center" spacing={'5vh'}>
        {tips.map((currTip, index) => {
          return (
            <Grid key={index} item xs={10} sm={5} md={5} lg={4} m={1}>
              <DisplayShortTip
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