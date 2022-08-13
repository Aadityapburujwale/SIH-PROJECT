import React from "react";

// import some dummy data as api
import TipsData from "../../../data/TipsData";
// use this component to display the crime / tips
import DisplayTip from "./DisplayTip";

export default function Tips() {
  return TipsData.map((Tip) => {
    return <DisplayTip Tip={Tip} key={Tip.id} />;
  });
}
