import React, { useState } from "react";

import MapPicker from "react-google-map-picker";

import axios from "axios"

const DefaultLocation = { lat: 11.764266743145665, lng: 79.68822061197824 };
const DefaultZoom = 10;

const App = ({lat , setLat , lng , setLng , setStateName , setCityName}) => {

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState({lat : lat , lng : lng});
  const [zoom, setZoom] = useState(DefaultZoom);

  async function handleChangeLocation(selectedLat, selectedLng) {
    console.log(selectedLat);
    console.log(selectedLng);

    setLat(selectedLat);
    setLng(selectedLng);

    function retrievePosition() {
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLng}&units=metric&appid=${apiKey}`;
      axios.get(url).then(setTheCityName);
      axios.get(`http://api.positionstack.com/v1/reverse?access_key=836bcc4db0c36bc9b6c93615243807c5&query=${selectedLat},${selectedLng}`).then(setTheStateName);
    }
    function setTheStateName(response){
      setStateName(response.data.data[0].region);
    }

    function setTheCityName(response){
      setCityName(response.data.name);
    }

    retrievePosition();
  

    setLocation({ lat: selectedLat, lng: selectedLng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  return (
    <>
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />



      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
        />
    </>
  );
};

export default App;
