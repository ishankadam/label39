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
} from "@mui/material";
import { adminSettings, countries } from "../../common";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../select-dropdown/selectDropdown";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./appbar.css";
const CustomAppbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAdmin] = useState(false);
  const [country, setCountry] = useState("india");
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

  const handleChange = () => {};
  return (
    <>
      <div className="notification wrapper">
        <Typography>
          USE CODE WELCOME10 TO GET 10% OFF ON YOUR FIRST PURCHASE
        </Typography>
      </div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div
            className="toolbar-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="logo-wrapper" onClick={() => handlePageChange("")}>
              <IconButton edge="start" color="inherit" aria-label="logo">
                <img
                  src={logo}
                  alt="logo"
                  style={{ height: "40px", marginRight: "10px" }}
                />
              </IconButton>
            </div>
            <div className="page-wrapper">
              <Button
                color="inherit"
                onClick={() => handlePageChange("")}
                sx={{ fontWeight: "bold" }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => handlePageChange("shop")}
                sx={{ fontWeight: "bold" }}
              >
                Shop
              </Button>
              <Button
                color="inherit"
                onClick={() => handlePageChange("aboutus")}
                sx={{ fontWeight: "bold" }}
              >
                About Us
              </Button>
              <Button
                color="inherit"
                onClick={() => handlePageChange("contactus")}
                sx={{ fontWeight: "bold" }}
              >
                Contact Us
              </Button>
            </div>
            {/* Settings option visible only for admins */}
            <div className="utilities-wrapper">
              <SelectDropdown
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
              ></SelectDropdown>
              <PermIdentityRoundedIcon></PermIdentityRoundedIcon>
              <SearchOutlinedIcon></SearchOutlinedIcon>
              <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
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
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CustomAppbar;
