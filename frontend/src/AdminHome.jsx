import { useState, useEffect } from "react";

import DisplayTip from "./components/DisplayTip";

import Contract from "./Contract";

export default function AdminHome() {
  const [tips, setTips] = useState([]);

  let murderTips = 0;
  let robberyTips = 0;

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
      {tips.map((currTip) => {
        if (currTip.crimeType === "Murder") {
          // setMurderTips(murderTips + 1);
          murderTips++;
        }
        if (
          currTip.crimeType === "robbery" ||
          currTip.crimeType === "Robbery"
        ) {
          // setRobberyTips(robberyTips + 1);
          robberyTips++;
        }
        console.log(currTip);
        return <DisplayTip currTip={currTip} key={currTip.crimeId} />;
      })}
      <h1>Robbery Tips are : {robberyTips}</h1>
      <h1>Murder Tips are : {murderTips}</h1>
    </>
  );
}
