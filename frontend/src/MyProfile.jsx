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
    <Grid container justifyContent="center" spacing={"5vh"}>
      {tips.map((currTip, index) => {
        return (
          <Grid key={index} item xs={10} sm={5} md={5} lg={4} m={1}>
            <DisplayMyShortTip currTip={currTip} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default MyProfile;
