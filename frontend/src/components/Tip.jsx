import React, { useState, useEffect } from "react";

// to hold the propes send by Link component from the DisplayTip .jsx
import { useLocation, useNavigate } from "react-router-dom";

// components
import DisplayTip from "./DisplayTip";

import Contract from "../Contract";

function Tip() {
  // useNavigate returns a function through which we can route to another route in functions

  const navigate = useNavigate();

  // location is used to access the states that are passed using the navigate function
  const location = useLocation();

  // this is the way through which we can access the states or data that renderes this component
  const { currTip } = location.state;
  const { isAdminLoggedIn } = location.state;

  const [currentTipThroughBlockchain, setCurrentTipThroughBlockchain] =
    useState(currTip);

  useEffect(() => {
    async function getTip() {
      const tip = await Contract.getCrimeById(currTip.crimeId._hex);
      setCurrentTipThroughBlockchain(tip);
    }
    getTip();
  }, []);

  // to be marked the current crime tip to be the isActive = false

  async function closeCase() {
    await Contract.closeCase(currTip.crimeId._hex);
    navigate("/AdminHome");
  }

  return (
    <DisplayTip
      currTip={currentTipThroughBlockchain}
      isAdminLoggedIn={isAdminLoggedIn}
      closeCase={closeCase}
    />
  );
}

export default Tip;
