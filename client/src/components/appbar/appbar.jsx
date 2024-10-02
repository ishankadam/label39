import React, { useState } from "react";
import logo from "../../assets/logo 1.png";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { adminSettings, countries } from "../../common";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../select-dropdown/selectDropdown";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "./../../css/appbar.css";

const CustomAppbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAdmin] = useState(false);
  const [country, setCountry] = useState("india");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageChange = (pageName) => {
    navigate(`/${pageName}`);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileOpen(open);
  };

  const handleChange = () => {};

  const menuItems = [
    { text: "Home", page: "" },
    { text: "Shop", page: "shop" },
    { text: "About Us", page: "aboutus" },
    { text: "Contact Us", page: "contactus" },
  ];

  return (
    <>
      <div className="notification-wrapper">
        <Typography className="notification-text">
          USE CODE WELCOME10 TO GET 10% OFF ON YOUR FIRST PURCHASE
        </Typography>
      </div>

      <AppBar
        position="static"
        color="transparent"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 1px 0 rgba(0, 0, 0, .16) !important",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            opacity="0.7"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <div
            className="logo-wrapper"
            onClick={() => handlePageChange("")}
            style={{
              flexGrow: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img
                src={logo}
                alt="logo"
                style={{ height: "40px", marginRight: "10px", width: "auto" }}
              />
            </IconButton>
          </div>

          {/* Navigation for large screens */}
          <Box
            className="page-wrapper"
            sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0.7 }}
          >
            {menuItems.map((item) => (
              <Button
                style={{
                  backgroundColor: "transparent",
                }}
                className="nav-options"
                key={item.text}
                color="inherit"
                onClick={() => handlePageChange(item.page)}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Right-side icons (only visible on larger screens) */}
          <div
            className="utilities-wrapper"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* Country Dropdown for larger screens */}
            <SelectDropdown
              className="country-dropdown"
              variant="outlined"
              margin="normal"
              sx={{
                display: { xs: "none", md: "flex" },
                width: "120px",
                height: "40px",
                padding: "6px 4px",
                margin: "0px 10px !important",
                fontSize: "14px",
              }} // Add margin to the left for spacing
              required
              select
              name="country"
              value={country}
              config={{ field: "country" }}
              handleEdit={handleChange}
              optionList={countries}
            />
            <IconButton color="inherit" sx={{ opacity: 0.7 }}>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ opacity: 0.7 }}>
              <PermIdentityRoundedIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ opacity: 0.7 }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>

            {/* User Menu for Admins */}
            {isAdmin && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Maeii" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {adminSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontFamily: "'Cinzel', serif !important",
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </div>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => handlePageChange(item.page)}
                >
                  <ListItemText
                    sx={{
                      fontFamily: "'Roboto Serif', serif !important",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    primary={item.text}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Floating Country Dropdown on Mobile and Tablet */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          display: { xs: "block", sm: "block", md: "none" }, // Show on mobile and tablet
          zIndex: "1000",
        }}
      >
        <SelectDropdown
          sx={{
            background: "white",
            width: "120px",
            height: "40px",
            padding: "6px 4px",
            margin: "0 10px",
            fontSize: "14px",
          }}
          className="country-dropdown"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          select
          name="country"
          value={country}
          config={{ field: "country" }}
          handleEdit={handleChange}
          optionList={countries}
        />
      </Box>
    </>
  );
};

export default CustomAppbar;
