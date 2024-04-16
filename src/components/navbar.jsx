import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Box,
  Button,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useAuth } from "../hooks/auth";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import LoginRegisterBox from "./loginregisterBox";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/userAuth";
import { Notifications } from "@mui/icons-material";
import NotificationsMenu from "./notificationsMenu";

function Navbar() {
  var isLoggedIn = useAuth();
  const [connection, setConnection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationMovies, setNotificationMovies] = useState([]);
  const [notificationCount, setNotificationCount] = useState(
    notificationMovies.length
  );
  const menuOpen = Boolean(anchorEl);

  const handleNotificationClick = (event) => {
    console.log("Clicked");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("Closing");
    setNotificationCount(0);
    setAnchorEl(null);
  };

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
            setNotificationMovies(message);
            setNotificationCount(notificationMovies.length);
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

  const StyledBtn = styled(Button)({
    variant: "h6",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
  });

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
          {isLoggedIn && (
            <div className="p-3">
              <Badge badgeContent={notificationCount} color="primary">
                <IconButton onClick={handleNotificationClick}>
                  <Notifications />
                </IconButton>
              </Badge>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <StyledBtn onClick={() => logout()}>LOGOUT</StyledBtn>
            </>
          ) : (
            <LoginRegisterBox />
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Menu
          open={menuOpen}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {notificationMovies.map((movie) => (
            <>
              <Link className="no-underline" to={`/movies/${movie.id}`}>
                <MenuItem
                  style={{
                    paddingInline: "40px",
                    paddingBlock: "20px",
                  }}
                  onClick={handleClose}
                >
                  <p key={movie.id}>
                    Movie notification: {movie.name} releasing at{" "}
                    {movie.releaseDate}
                  </p>

                  <Divider />
                  <br />
                </MenuItem>
              </Link>
            </>
          ))}
        </Menu>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default Navbar;
