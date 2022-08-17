import { useState } from "react";

export default function LoginForm({ setIsAdminLoggedIn }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
          alert("wrong username and password");
          setUserName("");
          setPassword("");
          setIsAdminLoggedIn(false);
        }
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "50px" }}>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="password"></label>
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">submit form</button>
      </form>
    </>
  );
}
