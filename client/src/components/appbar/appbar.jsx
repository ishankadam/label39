import React, { useEffect, useState } from "react";
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
  Badge,
} from "@mui/material";
import { countries } from "../../common";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../select-dropdown/selectDropdown";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "./../../css/appbar.css";
import CloseIcon from "@mui/icons-material/Close";
import ShopDialog from "../../pages/homepage/shopDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  closeCartDrawer,
  closeDialog,
  openCartDrawer,
  openDialog,
} from "../../store/cartSlice";
import { getCartItems } from "../../api";

const CustomAppbar = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [country, setCountry] = useState(props.country || "INRs");
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminSettings, setAdminSettings] = useState([
    { label: "Profile", url: "/profile", type: "navigate" },
    { label: "Dashboard", url: "/dashboard", type: "navigate" },
  ]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setCountry(props.country);
  }, [props.country]);
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

  const handleChange = (value) => {
    props.setCountry(value);
  };

  const menuItems = [
    { text: "Home", page: "" },
    { text: "Shop", page: "shop" },
    { text: "About Us", page: "ourStory" },
    { text: "Contact Us", page: "contactus" },
  ];

  useEffect(() => {
    const role = localStorage.getItem("role");

    setAdminSettings((prev) => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        async function getCartItemsForUser() {
          const cartItems = await getCartItems({ userId });
          if (cartItems.length === 0) return;
          dispatch(addToCart(cartItems));
          dispatch(closeCartDrawer());
        }
        getCartItemsForUser();
      }
      // Check if "Login" already exists in the array
      const hasLogin = prev.some((item) => item.label === "login");
      // Check if "Logout" already exists in the array
      const hasLogout = prev.some((item) => item.label === "Logout");

      if (role === null) {
        // If role is null and "Login" is not present, add it. Remove "Logout" if it exists.
        if (!hasLogin) {
          return [
            ...prev.filter((item) => item.label !== "Logout"), // Remove "Logout" if present
            { label: "login", type: "navigate", url: "/login" },
          ];
        }
      } else {
        // If role exists and "Logout" is not present, add it. Remove "Login" if it exists.
        if (!hasLogout) {
          return [
            ...prev.filter((item) => item.label !== "login"), // Remove "Login" if present
            { label: "Logout", type: "action", onClick: logout },
          ];
        }
      }

      // If no changes are needed, return the previous state
      return prev;
    });

    // Set isAdmin state based on role
    setIsAdmin(role === "admin");
  }, [props.userUpdated]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    dispatch(clearCart());
    props.setUserUpdated(false);
  };

  const handleNavigation = (url) => {
    console.log("test");
    handleCloseUserMenu(null);
    navigate(url);
  };

  const cartItemCount = useSelector((state) => state.cart.totalItems);

  const handleMenuItemClick = (setting) => {
    if (setting.type === "action") {
      setting.onClick();
    } else {
      handleNavigation(setting.url);
    }
    handleCloseUserMenu(null); // Close the menu
  };

  return (
    <>
      <Box
        // className="notification-wrapper"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#d7b4a7",
          color: "#583528",
          padding: "5px 10px",
          width: "100%",
          boxSizing: "border-box",
          overflow: { xs: "hidden", md: "unset" }, // Hide overflow for marquee on mobile
          whiteSpace: { xs: "nowrap", md: "unset" }, // Single-line text for marquee on mobile
        }}
      >
        <Typography
          // className="notification-text"
          sx={{
            textTransform: "capitalize",
            fontFamily: '"Roboto Serif", serif',
            fontSize: { xs: "12px", sm: "14px" }, // Responsive font size
            fontWeight: 500,
            textAlign: "center",
            animation: {
              xs: "scrollLeft 12s linear infinite",
              md: "none", // No animation on larger screens
            },
          }}
        >
          free domestic shipping | free international shipping over Rs. 25000 |
          use code 'welcome10' on first order
        </Typography>
      </Box>

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
            sx={{
              display: { xs: "flex", md: "none" },
              width: { xs: "80px", sm: "80px" },
              justifyContent: "left",
              color: "#626262",
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Box
            className="logo-wrapper"
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "left" },
              flexGrow: 1,
              textAlign: { xs: "center", sm: "center", md: "left" },
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img
                src={logo}
                alt="logo"
                style={{ height: "40px", width: "auto" }}
                onClick={() => handlePageChange("")}
              />
            </IconButton>
          </Box>

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
                onMouseEnter={() => {
                  if (item.text === "Shop") {
                    dispatch(openDialog()); // Open dialog only for the "Shop" button
                  }
                }}
                onMouseLeave={() => {
                  dispatch(closeDialog()); // Close dialog only for the "Shop" button
                }}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
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
            <IconButton
              color="inherit"
              sx={{
                display: { xs: "none", md: "flex" }, // Hide on mobile
                opacity: 0.7,
              }}
              onClick={handleOpenUserMenu}
            >
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <PermIdentityRoundedIcon
                    sx={{ p: 0 }}
                  ></PermIdentityRoundedIcon>
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
                  open={anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  {adminSettings.map((setting) => (
                    <MenuItem
                      key={setting.label}
                      onClick={() => handleMenuItemClick(setting)}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontFamily: "'Cinzel', serif !important",
                        }}
                      >
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ opacity: 0.7, paddingRight: { xs: "0", sm: "auto" } }}
              onClick={() => dispatch(openCartDrawer())}
            >
              <Badge
                badgeContent={cartItemCount} // Number of items
                color="error" // Red badge
                overlap="circular" // Adjusts position for circular icons
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {/* User Menu for Admins */}
          </div>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 220,
              position: "relative", // Allow positioning of the close icon
            }}
            role="presentation"
          >
            {/* Close Icon */}
            <IconButton
              onClick={toggleDrawer(false)} // Close the drawer when clicked
              sx={{
                position: "absolute",
                top: "8px",
                left: 2,
                zIndex: 10, // Ensure it stays on top
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Nav Options */}
            <List sx={{ mt: "50px", mx: 2, borderBottom: "1px solid #ccc" }}>
              {" "}
              {/* Add margin to push content below the close icon */}
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => handlePageChange(item.page)}
                  sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "left",
                    borderBottom: "1px solid #ccc",
                    borderWidth: "60%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Cinzel', serif !important",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "8px 0px",
                    }}
                  >
                    {item.text}
                  </Typography>
                </ListItem>
              ))}
              {/* Account Icon: Visible only on mobile */}
              <ListItem
                button
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "left",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: "500",
                    fontSize: "14px",
                    padding: "8px 0px",
                  }}
                >
                  Account
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Floating Country Dropdown on Mobile and Tablet */}
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          left: 5,
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
      <ShopDialog></ShopDialog>
    </>
  );
};

export default CustomAppbar;
