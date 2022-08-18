// importing react , react hooks
import React, { useEffect, useState } from "react";

// components

// use this component to display the crime / tips 1 by 1
import DisplayTip from "./components/DisplayTip";

// import contract through which we can communicate to the blockchain
import Contract from "./Contract";

export default function Tips() {
  const [tips, setTips] = useState([]);

  // function to get all the tips
  // this function get execute from useEffect hook whenever a component is loaded
  async function getTips() {
    try {
      if (Contract) {
        const allTips = await Contract.getCrimes();
        console.log(allTips);
        setTips(allTips);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // adding an a event whenever component is loaded for the first time
  useEffect(() => {
    getTips();
  }, []);

  return (
    <>
      {tips.map((currTip) => (
        <DisplayTip currTip={currTip} key={currTip.crimeId} />
      ))}
    </>
  );
}
