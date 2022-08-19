import React from "react";

// to hold the propes send by Link component from the DisplayTip .jsx
import { useLocation, useNavigate } from "react-router-dom";

// components
import DisplayTip from "./DisplayTip";

import Contract from "../Contract";

function Tip() {
  // useNavigate returns a function through which we can route to another route in functions
  const navigate = useNavigate();

  const location = useLocation();

  const { currTip } = location.state;
  const { isAdminLoggedIn } = location.state;

  async function closeCase() {
    await Contract.closeCase(currTip.crimeId._hex);
    navigate("/");
  }

  console.log(currTip);

  return (
    <div>
      <DisplayTip
        isDisplayWholeTip={false}
        currTip={currTip}
        isAdminLoggedIn={isAdminLoggedIn}
        closeCase={closeCase}
      />
    </div>
  );
}

export default Tip;
