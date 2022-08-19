import React, { useState, useEffect } from "react";
import DisplayMyTip from "./components/DisplayMyTip";

import Contract from "./Contract";

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
      {/* <h1>inside my profile</h1> */}
      {tips.map((currTip, index) => {
        return (
          <DisplayMyTip
            currTip={currTip}
            key={index}
            isDisplayWholeTip={false}
          />
        );
      })}
    </>
  );
}

export default MyProfile;
