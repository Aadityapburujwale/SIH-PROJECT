import React from "react";

// to hold the propes send by Link component from the DisplayTip .jsx
import { useLocation } from "react-router-dom";

// components
import DisplayMyTip from "./DisplayMyTip";

function Tip() {
  const location = useLocation();

  const { currTip } = location.state;

  console.log(currTip);

  return (
    <div>
      <DisplayMyTip isDisplayWholeTip={true} currTip={currTip} />
    </div>
  );
}

export default Tip;
