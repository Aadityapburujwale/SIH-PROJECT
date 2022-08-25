import React, { useState } from "react";

import MapPicker from "react-google-map-picker";

const App = ({lat , lng , stateName , cityName}) => {

  console.log(lat);
  console.log(lng);

  return (
    <>
      <MapPicker
        defaultLocation={{lat :  parseFloat(lat), lng : parseFloat(lng)}}
        mapTypeId="roadmap"
        style={{ height: "300px" }}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />  
      <p>State Name : {stateName}</p>
      <p>City Name : {cityName}</p>
    </>
  );
};

export default App;
