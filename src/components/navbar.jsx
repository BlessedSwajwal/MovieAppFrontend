import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../hooks/auth";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

import LoginRegisterBox from "./loginregisterBox";
import Footer from "./footer";
import { useEffect, useState } from "react";
function Navbar() {
  var isLoggedIn = useAuth();
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(" https://localhost:7104/hub/notifications")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveNotification", (message) => {
            console.log(message);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const appBarItemsStyle = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/movies"
            sx={{ ...appBarItemsStyle, flexGrow: 1 }}
          >
            MOVIE APP
          </Typography>
          {isLoggedIn || <LoginRegisterBox />}
        </Toolbar>
      </AppBar>
      <Outlet />
      <Footer />
    </>
  );
}

export default Navbar;
