import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function NotificationsMenu(anchorEl, setAnchorEl) {
  const menuOpen = Boolean(anchorEl);
  console.log("anchor el: " + anchorEl == null);
  const handleClose = () => {
    console.log("Closing");
    setAnchorEl(null);
  };

  return (
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
        <MenuItem
          style={{
            paddingInline: "40px",
            paddingBlock: "20px",
          }}
          onClick={handleClose}
        >
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            Profile
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default NotificationsMenu;
