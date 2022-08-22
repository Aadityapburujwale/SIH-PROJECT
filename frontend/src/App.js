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

import { Routes, Route, Navigate } from "react-router-dom";
import AutoGrid from "./components/AutoGrid";

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

      <Routes>
        <Route
          path="/"
          element={
            <AutoGrid
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
      </Routes>
    </div>
  );
}
