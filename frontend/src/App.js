import "./styles.css";

import { useState } from "react";

import Header from "./components/Header";
import Tips from "./Tips";
import AdminHome from "./AdminHome";
import LoginForm from "./LoginForm";
import Form from "./Form";
import Tip from "./components/Tip";
import MyTip from "./components/MyTip";
import MyProfile from "./MyProfile";
import SpeechToText from "./SpeechToText";

import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const [isUserConnected, setIsUserConnected] = useState(
    window.sessionStorage.getItem("isUserConnected")
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    window.localStorage.getItem("isAdminLoggedIn")
  );

  return (
    <div className="App">
      <Header
        isUserConnected={isUserConnected}
        setIsUserConnected={setIsUserConnected}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      ></Header>

      {/* Here we're defining the which component should render when the route is changed without reloadin the web page */}
      <Routes>
        <Route
          path="/"
          element={
            <Tips
              isAdminLoggedIn={isAdminLoggedIn}
              isUserConnected={isUserConnected}
            />
          }
        />
        <Route
          path="/AdminHome"
          element={
            isAdminLoggedIn ? <AdminHome /> : <Navigate to="/LoginForm" />
          }
        />
        <Route path="/Form" element={<Form />} />
        <Route
          exact
          path="/LoginForm"
          element={
            isAdminLoggedIn ? (
              <Navigate to="/AdminHome" />
            ) : (
              <LoginForm setIsAdminLoggedIn={setIsAdminLoggedIn}></LoginForm>
            )
          }
        />
        <Route exact path="/Tip" element={<Tip />} />
        <Route exact path="/MyProfile" element={<MyProfile />} />
        <Route exact path="/MyProfile/MyTip" element={<MyTip />} />
        <Route exact path="/SpeechToText" element={<SpeechToText />} />
      </Routes>
    </div>
  );
}
