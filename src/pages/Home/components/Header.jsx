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
// import MenuItem from "@mui/icons-material/MenuItem";

import { Link } from "react-router-dom";

// react hooks
import { useState } from "react";

export default function Header() {
  const [isUserConnected, setIsUserConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Metamask not found");
        return;
      }

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });
        const account = accounts[0];

        // handle the case if user reject to connect to network

        console.log(account);
        setIsUserConnected(true);
      } catch (error) {
        console.log("error");
      }
    } catch (error) {
      console.log("error occured");
    }
  };
  return (
    <Box sx={{ flexBox: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#063970" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button variant="none">Griffins</Button>
            {/* add onClick listener to get listen on the home page */}
          </Typography>

          <Link to="/Form" style={{ TextDecoration: "none" }}>
            <Button endIcon={<SendIcon />} variant="contained">
              Submit Tip
            </Button>
          </Link>

          {!isUserConnected && (
            <Button
              startIcon={<LoginIcon />}
              variant="contained"
              onClick={() => {
                connectWallet();
              }}
              color="success"
              sx={{ marginLeft: "5px" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
