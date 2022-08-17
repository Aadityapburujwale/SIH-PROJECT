import "./styles.css";

import { useState } from "react";

import Header from "./components/Header";
import Tips from "./Tips";
import AdminHome from "./AdminHome";
import LoginForm from "./LoginForm";
import Form from "./Form";

import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const [isUserConnected, setIsUserConnected] = useState(
    window.localStorage.getItem("isUserConnected")
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
        <Route path="/" element={<Tips />} />
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
      </Routes>
    </div>
  );
}
