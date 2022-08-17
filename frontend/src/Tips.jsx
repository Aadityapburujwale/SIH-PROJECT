// importing react , react hooks
import React, { useEffect, useState } from "react";

// components

// use this component to display the crime / tips 1 by 1
import DisplayTip from "./components/DisplayTip";

// import contract through which we can communicate to the blockchain
import Contract from "./Contract";

export default function Tips() {
  const [tips, setTips] = useState([]);

  const getTips = async () => {
    try {
      if (Contract) {
        const allTips = await Contract.getCrimes();
        setTips(allTips);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
