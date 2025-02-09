import AddIcon from "@mui/icons-material/Add";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../api";
import logo from "../../assets/logo 1.png";
import { countries, featured } from "../../common";
import ShopDialog from "../../pages/homepage/shopDialog";
import {
  addToCart,
  clearCart,
  closeCartDrawer,
  openCartDrawer,
  setCurrency,
  setFilter,
  setSizeChart,
  showSnackbar,
} from "../../store/cartSlice";
import SelectDropdown from "../select-dropdown/selectDropdown";
import "./../../css/appbar.css";

const CustomAppbar = (props) => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [categories, setCategories] = useState(props.allCategories);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [country, setCountry] = useState(props.country || "INRs");
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminSettings, setAdminSettings] = useState([
    { label: "Profile", url: "/profile", type: "navigate" },
  ]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (categories.length > 0) {
      const sizeChart = categories.map((category) => {
        return { category: category.value, sizeChart: category.sizeChart };
      });
      dispatch(setSizeChart(sizeChart));
    }
  }, [categories]);

  useEffect(() => {
    console.log("view product modal");
  }, []);

  useEffect(() => {
    setCategories(props.allCategories);
    if (props.allCategories.length > 0) {
      const sizeChart = props.allCategories.map((category) => {
        return { category: category.value, sizeChart: category.sizeChart };
      });
      dispatch(setSizeChart(sizeChart));
    }
  }, [props.allCategories]);

  useEffect(() => {
    setCountry(props.country);
  }, [props.country]);
  const handlePageChange = (pageName) => {
    navigate(`/${pageName}`);
  };

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const handleChange = (value) => {
    dispatch(setCurrency(value));
    props.setCountry(value);
  };

  const handleMobileShopPageChange = (page, value, field) => {
    navigate(page);
    value && dispatch(setFilter({ [field]: value }));
    toggleDrawer(false)();
  };
  const [openCategories, setOpenCategories] = useState(false);
  const [openFeatured, setOpenFeatured] = useState(false);

  const menuItems = [
    { text: "Home", page: "" },
    { text: "Shop", page: "shop" },
    { text: "About Us", page: "ourStory" },
    { text: "Gift card", page: "giftcard" },
    { text: "Client Diaries", page: "clientsDiaries" },
    { text: "Celebrity Style", page: "celebrityStylePage" },
  ];

  const [openShopMenu, setOpenShopMenu] = useState(false);
  // Function to toggle the shop menu
  const toggleShopMenu = () => {
    setOpenShopMenu((prev) => !prev);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    setAdminSettings((prev) => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        async function getCartItemsForUser() {
          const cartItems = await getCartItems({ userId, country });
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
    handleOptionListUpdate();
  }, [props.userUpdated, country]);

  const handleOptionListUpdate = () => {
    const userId = localStorage.getItem("userId");
    if (isAdmin) {
      setAdminSettings((prev) => {
        const filtered = prev.filter((item) => item.label !== "Orders"); // Remove "Orders"

        // Add "Dashboard" only if it does not exist
        if (!filtered.some((item) => item.label === "Dashboard")) {
          filtered.push({
            label: "Dashboard",
            url: "/dashboard",
            type: "navigate",
          });
        }

        return filtered;
      });
    } else if (userId) {
      setAdminSettings((prev) => {
        const filtered = prev.filter((item) => item.label !== "Dashboard"); // Remove "Dashboard"

        // Add "Orders" only if it does not exist
        if (!filtered.some((item) => item.label === "Orders")) {
          filtered.push({ label: "Orders", url: "/orders", type: "navigate" });
        }

        return filtered;
      });
    } else {
      setAdminSettings((prev) => {
        const filtered = prev.filter(
          (item) => item.label !== "Orders" && item.label !== "Dashboard"
        ); // Remove both

        return filtered; // Return the cleaned array
      });
    }
  };

  useEffect(() => {
    handleOptionListUpdate();
  }, [isAdmin]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    dispatch(clearCart());
    dispatch(
      showSnackbar({
        message: `You've been logged out. See you next time!`,
        severity: "warning",
      })
    );
    props.setUserUpdated(false);
  };

  const handleNavigation = (url) => {
    navigate(url);
    handleCloseUserMenu();
  };
  const cartItemCount = useSelector((state) => state.cart.totalItems);

  const handleMenuItemClick = (setting) => {
    if (setting.type === "action") {
      setting.onClick();
    } else {
      handleNavigation(setting.url);
    }
    handleOptionListUpdate();
    handleCloseUserMenu(); // Close the menu
  };

  // Add these to your mobile component
  const [formattedCategories, setFormattedCategories] = useState([]);

  useEffect(() => {
    if (!categories) return;
    const formatted = categories
      .filter((row) => row.show)
      .map((category) => ({
        label: category.name,
        value: category.value,
      }));
    setFormattedCategories(formatted);
  }, [categories]);
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
          WORLDWIDE SHIPPING | FREE SHIPPING IN INDIA | USE CODE WELCOME10 TO
          GET 10% OFF ON YOUR FIRST PURCHASE
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="logo"
              onClick={() => handlePageChange("")}
            >
              <img
                src={logo}
                alt="logo"
                style={{ height: "40px", width: "auto" }}
              />
            </IconButton>
          </Box>

          {/* Navigation for large screens */}
          <Box
            className="page-wrapper"
            sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0.7 }}
          >
            {menuItems.map((item) => (
              <Box
                key={item.text}
                onMouseEnter={() => item.text === "Shop" && setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
                style={{ position: "relative" }} // Ensure relative positioning for absolute dialog
              >
                <Button
                  style={{ backgroundColor: "transparent" }}
                  className="nav-options"
                  color="inherit"
                  onClick={() =>
                    item.page === "giftcard"
                      ? props.setIsGiftCardModalOpen(true)
                      : handlePageChange(item.page)
                  }
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  {item.text}
                </Button>

                {/* ShopDialog - Display only on hover */}
                {item.text === "Shop" && isShopOpen && (
                  <Box
                    maxWidth="lg"
                    onMouseEnter={() => setIsShopOpen(true)}
                    onMouseLeave={() => setIsShopOpen(false)}
                    sx={{
                      position: "absolute",
                      top: "100%", // Positioned right below the button
                      left: "50%", // Centered with respect to the Shop button
                      transform: "translateX(-50%)", // Moves it back by half its width
                      zIndex: 1000,
                      backgroundColor: "white",

                      // padding: 2,
                      paddingTop: "12px",
                    }}
                  >
                    <ShopDialog categories={categories} />
                  </Box>
                )}
              </Box>
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
                width: { xs: "80px", md: "80px", lg: "120px" },
                height: "40px",
                padding: "6px 0px",
                margin: "0px 10px !important",
                fontSize: "14px",
              }}
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
                display: { xs: "flex", md: "flex" },
                opacity: 0.7,
                p: 1,
              }}
              onClick={handleOpenUserMenu}
            >
              <Tooltip title="Open settings">
                <PermIdentityRoundedIcon />
              </Tooltip>
            </IconButton>
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
                <MenuItem
                  key={setting.label}
                  onClick={() => handleMenuItemClick(setting)}
                >
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: "'Cinzel', serif !important" }}
                  >
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              color="inherit"
              sx={{ opacity: 0.7, p: 1 }}
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
            <IconButton
              color="inherit"
              sx={{
                opacity: 0.7,
                padding: "8px 0 8px 8px",
                display: { xs: "none", md: "flex" }, // Hide on mobile
              }}
              onClick={() => navigate("/contactUs")}
            >
              <CallOutlinedIcon />
            </IconButton>

            {/* User Menu for Admins */}
          </div>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 280, position: "relative" }} role="presentation">
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
              {menuItems.map((item) => {
                if (item.text === "Shop") {
                  return (
                    <div
                      key={item.text}
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      {/* Shop item with toggle */}
                      <ListItem
                        button
                        // onClick={toggleShopMenu}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Cinzel', serif !important",
                            fontSize: "15px",
                            fontWeight: "500",
                            padding: "8px 0px",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.text}
                        </Typography>
                        <IconButton size="small" onClick={toggleShopMenu}>
                          {openShopMenu ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                        {/* 
                        <IconButton
                          onClick={toggleShopMenu} // Toggle shop menu
                          sx={{ padding: 0 }}
                        >
                          <AddIcon />
                        </IconButton> */}
                      </ListItem>

                      {/* Collapse menu for shop options */}
                      <Collapse
                        in={openShopMenu}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "#F8F8FF" }}
                      >
                        <List sx={{ marginLeft: "10px" }}>
                          {/* Products */}
                          <ListItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            button
                            onClick={() => {
                              navigate(`/shop`);
                              dispatch(setFilter({ category: "" }));
                              toggleDrawer(false)();
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "'Cinzel', serif !important",
                                fontSize: "15px",
                                fontWeight: "500",
                                padding: "8px 0px",
                                textTransform: "uppercase",
                                // color: "#5c5c5c",
                              }}
                            >
                              Products
                            </Typography>
                            <IconButton size="small">
                              <ArrowRightAltIcon />
                            </IconButton>
                          </ListItem>

                          <ListItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            button
                            onClick={() => setOpenCategories(!openCategories)}
                          >
                            <Typography
                              sx={{
                                fontFamily: "'Cinzel', serif !important",
                                fontSize: "15px",
                                fontWeight: "500",
                                padding: "8px 0px",
                                textTransform: "uppercase",
                                // color: "#5c5c5c",
                              }}
                            >
                              CATEGORIES
                            </Typography>
                            <IconButton size="small">
                              {openCategories ? <RemoveIcon /> : <AddIcon />}
                            </IconButton>
                          </ListItem>
                          <Collapse
                            in={openCategories}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List>
                              {formattedCategories.map((category) => (
                                <ListItem
                                  button
                                  key={category.value}
                                  onClick={() => {
                                    handleMobileShopPageChange(
                                      "/shop",
                                      category.value,
                                      "category"
                                    );
                                    toggleDrawer(false)();
                                  }}
                                  sx={{
                                    borderLeft: "1px solid #ccc",
                                    marginLeft: "16px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontFamily: "'Cinzel', serif",
                                      fontWeight: "500",
                                      fontSize: "15px",
                                      padding: "8px 0px",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {category.label}
                                  </Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>

                          {/* Featured Items */}
                          <ListItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            button
                            onClick={() => setOpenFeatured(!openFeatured)}
                          >
                            <Typography
                              sx={{
                                fontFamily: "'Cinzel', serif !important",
                                fontSize: "15px",
                                fontWeight: "500",
                                padding: "8px 0px",
                                // color: "#5c5c5c",
                                textTransform: "uppercase",
                              }}
                            >
                              FEATURED
                            </Typography>
                            <IconButton size="small">
                              {openFeatured ? <RemoveIcon /> : <AddIcon />}
                            </IconButton>
                          </ListItem>
                          <Collapse
                            in={openFeatured}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List>
                              {featured.map((feature) => (
                                <ListItem
                                  button
                                  key={feature.value}
                                  onClick={() => {
                                    handleMobileShopPageChange(
                                      "/shop",
                                      feature.value,
                                      "featured"
                                    );
                                    toggleDrawer(false)();
                                  }}
                                  sx={{
                                    borderLeft: "1px solid #ccc",
                                    marginLeft: "16px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontFamily: "'Cinzel', serif",
                                      fontWeight: "500",
                                      fontSize: "15px",
                                      padding: "8px 0px",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {feature.label}
                                  </Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </List>
                      </Collapse>
                    </div>
                  );
                } else {
                  return (
                    <ListItem
                      button
                      key={item.text}
                      // onClick={() => handlePageChange(item.page)}
                      onClick={() => {
                        if (item.page === "giftcard") {
                          props.setIsGiftCardModalOpen(true);
                        } else {
                          handlePageChange(item.page);
                        }
                        toggleDrawer(false)();
                      }}
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
                          fontSize: "15px",
                          fontWeight: "500",
                          padding: "8px 0px",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.text}
                      </Typography>
                    </ListItem>
                  );
                }
              })}

              {/* Account Icon: Visible only on mobile */}
              <ListItem
                button
                onClick={() => {
                  navigate("/contactUs");
                  toggleDrawer(false)();
                }}
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "left",
                  borderBottom: "1px solid #ccc",
                  borderWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: "500",
                    fontSize: "15px",
                    padding: "8px 0px",
                    textTransform: "uppercase",
                  }}
                >
                  Contact us
                </Typography>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  props.setOpenSubscribeModal(true);
                  toggleDrawer(false)();
                }}
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "left",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: "500",
                    fontSize: "15px",
                    padding: "8px 0px",
                    textTransform: "uppercase",
                  }}
                >
                  Subscribe
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
    </>
  );
};

export default CustomAppbar;
