import { useState } from "react";

export default function LoginForm({ setIsAdminLoggedIn }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const formStyle = {
    margin: "200px auto auto auto",
    padding: "10px",
    border: "1px solid #c9c9c9",
    borderRadius: "5px",
    background: "#f5f5f5",
    width: "220px",
    display: "block",
  };

  const labelStyle = {
    margin: "10px 0 5px 0",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "15px",
  };

  const inputStyle = {
    margin: "5px 0 10px 0",
    padding: "5px",
    border: "1px solid #bfbfbf",
    borderRadius: "3px",
    boxSizing: "border-box",
    width: "100%",
  };

  const submitStyle = {
    margin: "10px 0 0 0",
    padding: "7px 10px",
    border: "1px solid #efffff",
    borderRadius: "3px",
    background: "#3085d6",
    width: "100%",
    fontSize: "15px",
    color: "white",
    display: "block",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let loginDetails = {
      username: username,
      password: password,
    };

    fetch("http://localhost:2000", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((response) => response.json())
      .then((response) => {
        // if response is true from the backend
        if (response.success) {
          window.localStorage.setItem("isAdminLoggedIn", "true");
          setIsAdminLoggedIn(true);
        } else {
          alert("wrong username or password");
          setUserName("");
          setPassword("");
          setIsAdminLoggedIn(false);
        }
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="username" style={labelStyle}>
          Username
        </label>
        <input
          style={inputStyle}
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="password" style={labelStyle}>
          Password
        </label>
        <input
          style={inputStyle}
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" style={submitStyle}>
          submit form
        </button>
      </form>
    </>
  );
}
