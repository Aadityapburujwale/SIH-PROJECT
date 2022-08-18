import React from "react";

import { useLocation } from "react-router-dom";

import DisplayTip from "./DisplayTip";

function Tip() {
  const location = useLocation();
  const { currTip } = location.state;
  const { isAdminLoggedIn } = location.state;

  console.log(currTip);

  return (
    <div>
      <DisplayTip
        isDisplayWholeTip={false}
        currTip={currTip}
        isAdminLoggedIn={isAdminLoggedIn}
      />
    </div>
  );
}

export default Tip;
