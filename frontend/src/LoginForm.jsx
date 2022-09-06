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
          alert("wrong username or password");
          setUserName("");
          setPassword("");
          setIsAdminLoggedIn(false);
        }
      });
  }

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img
                src={process.env.PUBLIC_URL + "/sji.png"}
                alt="IMG"
                style={{ marginLeft: "11%", width: "220px" }}
              />

              {/* <img
                src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                alt="IMG"
              /> */}
            </div>
            <form
              onSubmit={handleSubmit}
              className="login100-form validate-form"
            >
              <span className="login100-form-title">Police Administration</span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="Username"
                  placeholder="Username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  value={username}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Login
                </button>
              </div>

              {/* <div className="text-center p-t-136">
                <button type="submit">submit</button>
                <a className="txt2" href="#"></a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
