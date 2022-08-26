// react components , hooks
import React from "react";

// material ui components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles.css";

// react-router-dom components
import { Link } from "react-router-dom";

export default function Header({
  isUserConnected,
  setIsUserConnected,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) {
  async function connectWallet() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Metamask not found");
        alert(
          "please connect to Metamask by clicking connect wallet This is totally anonymous"
        );
        return;
      }
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];

        console.log("it's inside the connectWallet", account);

        if (account) {
          window.sessionStorage.setItem("isUserConnected", "true");
          return setIsUserConnected(true);
        }
      } catch (error) {
        setIsUserConnected(false);
        console.log("this error occured : ");
      }
    } catch (error) {
      console.log("error occured");
    }
  }

  return (
    <Box sx={{ flexBox: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#063970" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Link to={"/"}>
              <Button variant="none" color="inherit">BlockChain Based Anonymous Reporting System</Button>
            </Link> */}
            <div id="Name">
              <Link to={"/"}>
                <h4>Blockchain Based Anonymous Reporting System</h4>
              </Link>
            </div>
          </Typography>

          {isAdminLoggedIn ? (
            <>
              <Link to={"/"}>
                <Button
                  startIcon={<LocalPoliceIcon />}
                  variant="contained"
                  color="success"
                  sx={{ marginLeft: "5px" }}
                  onClick={() => {
                    window.localStorage.removeItem("isAdminLoggedIn");
                    setIsAdminLoggedIn(false);
                  }}
                >
                  COP Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              {isUserConnected ? (
                <>
                  <Link to="/Form">
                    <Button
                      endIcon={<SendIcon />}
                      variant="contained"
                      sx={{ margin: "5px" }}
                    >
                      Submit Tip
                    </Button>
                  </Link>
                  <Link to="/MyProfile">
                    <Button
                      startIcon={<AccountCircleIcon />}
                      variant="contained"
                    >
                      View Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  startIcon={<LoginIcon />}
                  variant="contained"
                  onClick={() => {
                    connectWallet();
                  }}
                  color="success"
                  sx={{ margin: "5px" }}
                >
                  Connect Wallet
                </Button>
              )}

              <Link to="/LoginForm">
                <Button
                  startIcon={<LocalPoliceIcon />}
                  variant="contained"
                  color="success"
                  sx={{ margin: "5px" }}
                >
                  COP Login
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
