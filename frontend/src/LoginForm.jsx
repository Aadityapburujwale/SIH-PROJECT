import React from "react";

const appStyle = {
  height: "550px",
  display: "flex",
};

<<<<<<< HEAD
const formStyle = {
  margin: "auto",
  padding: "10px",
  border: "1px solid #c9c9c9",
  borderRadius: "5px",
  background: "#f5f5f5",
  width: "220px",
  display: "block",
};
=======

  const formStyle = {
    margin: "200px auto auto auto",
    padding: "10px",
    border: "1px solid #c9c9c9",
    borderRadius: "5px",
    background: "#f5f5f5",
    width: "220px",
    display: "block"
  };
  
  const labelStyle = {
    margin: "10px 0 5px 0",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "15px"
  };
  
  const inputStyle = {
    margin: "5px 0 10px 0",
    padding: "5px",
    border: "1px solid #bfbfbf",
    borderRadius: "3px",
    boxSizing: "border-box",
    width: "100%"
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
    display: "block"
  };
  

  async function handleSubmit(e) {
    e.preventDefault();
>>>>>>> 15ca2062c9203397b5686d24fd2d61cbd0b81042

const labelStyle = {
  margin: "10px 0 5px 0",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "15px",
};

<<<<<<< HEAD
const inputStyle = {
  margin: "5px 0 10px 0",
  padding: "5px",
  border: "1px solid #bfbfbf",
  borderRadius: "3px",
  boxSizing: "border-box",
  width: "100%",
};
=======
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
>>>>>>> 15ca2062c9203397b5686d24fd2d61cbd0b81042

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

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
<<<<<<< HEAD
    <div>
      <label style={labelStyle}>{label}</label>
      <input ref={ref} type={type} style={inputStyle} />
    </div>
  );
});

const Form = ({ onSubmit }) => {
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <Field ref={usernameRef} label="Username:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

// Usage example:

const LoginForm = () => {
  const handleSubmit = (data) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  return (
    <div style={appStyle}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginForm;
=======
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="username" style={labelStyle}>Username</label>
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
        <label htmlFor="password" style={labelStyle}>Password</label>
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
        <button type="submit" style={submitStyle}>submit form</button>
      </form>
    </>
  );
}
>>>>>>> 15ca2062c9203397b5686d24fd2d61cbd0b81042
