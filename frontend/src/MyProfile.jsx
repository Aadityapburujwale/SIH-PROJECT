import React, { useState, useEffect } from "react";
import DisplayMyShortTip from "./components/DisplayMyShortTip";

import Contract from "./Contract";

// material ui
import Grid from "@mui/material/Grid";

function MyProfile() {
  const [tips, setTips] = useState([]);

  async function getCurrentUserCrimeTips() {
    const currentUserTips = await Contract.getCrimeOfCurrentUser();
    setTips(currentUserTips);
  }

  useEffect(() => {
    getCurrentUserCrimeTips();
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "1vh",
          boxShadow: "2px 2px 7px 1px rgba(28,110,164,0.29)",
          padding: "2vh",
        }}
      >
        Tips That Are Reported By You
      </h1>
      <Grid container justifyContent="center" spacing={"5vh"}>
        {tips.map((currTip, index) => {
          return (
            <Grid key={index} item xs={10} sm={5} md={5} lg={4} m={1}>
              <DisplayMyShortTip currTip={currTip} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default MyProfile;
