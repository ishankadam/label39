import { Box, Button, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import {
  getAllCategories,
  getAllCelebrityStyles,
  getAllClientDiaries,
  getAllDiscounts,
  getAllGiftcard,
  getAllOrders,
  getAllProducts,
  getAllSales,
  getAllTestimonials,
  getAllUsers,
} from "../../api";
import { dashboardTabValue } from "../../common";
import PageNotFound from "../not-found/pageNotFound";
import ProfilePage from "../profile/profile";
import CelebrityStyle from "./celebrityStyle";
import ClientsDiaries from "./clientsDiaries";
import GiftCardPage from "./giftCard";
import ManageCategories from "./manageCategory";
import ManageDiscount from "./manageDiscount";
import ManageOrders from "./manageOrders";
import ManageTestimonials from "./manageTestimonials";
import ManageUsers from "./manageUsers";
import ProductTable from "./productTable";
import Sale from "./sale";
const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: `${theme.mixins.toolbar.minHeight}px`, // Align with AppBar height
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "drawerWidth",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  marginTop: `${theme.mixins.toolbar.minHeight + 30}px`, // Default for xs
  [theme.breakpoints.up("sm")]: {
    marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For sm and above
  },
  [theme.breakpoints.up("md")]: {
    marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For md and above
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For lg and above
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      marginTop: `${theme.mixins.toolbar.minHeight + 30}px`, // Default for xs
      [theme.breakpoints.up("sm")]: {
        marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For sm and above
      },
      [theme.breakpoints.up("md")]: {
        marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For md and above
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For lg and above
      },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      marginTop: `${theme.mixins.toolbar.minHeight + 30}px`, // Default for xs
      [theme.breakpoints.up("sm")]: {
        marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For sm and above
      },
      [theme.breakpoints.up("md")]: {
        marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For md and above
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: `${theme.mixins.toolbar.minHeight + 40}px`, // For lg and above
      },
    },
  }),
}));

const Dashboard = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState("Products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [clientDiaries, setClientDiaries] = useState([]);
  const [celebrityStyles, setCelebrityStyles] = useState([]);
  const [giftCards, setGiftCards] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [users, setUsers] = useState([]);

  const [categoryloading, setCategoryLoading] = useState(false);
  const [testimonialsloading, setTestimonialsLoading] = useState(false);
  const [clientDiariesLoading, setclientDiariesLoading] = useState(false);
  const [celebrityStylesLoading, setcelebrityStylesLoading] = useState(false);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [giftCardLoading, setGiftCardLoading] = useState(false);
  const [saleLoading, setsaleLoading] = useState(false);
  const [usersloading, setUsersLoading] = useState(false);
  const [tabValue, setTabValue] = React.useState("one");
  const [productsloading, setProductsLoading] = useState(false);

  const [allOrders, setAllOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });
  const [showProductModal, setShowProductModal] = useState(
    props.showProductModal
  );
  const [showTestimonialModal, setShowTestimonialModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });
  const [showUserModal, setShowUserModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    setShowProductModal(props.showProductModal);
  }, [props.showProductModal]);

  useEffect(() => {
    getAllCategories({ setCategories, setLoading: setCategoryLoading });
    getAllTestimonials({ setTestimonials, setLoading: setTestimonialsLoading });
    getAllUsers({ setUsers, setLoading: setUsersLoading });
    getAllOrders({ role: "admin", setAllOrders });
    getAllClientDiaries({
      setClientDiaries,
      setLoading: setclientDiariesLoading,
    });
    getAllCelebrityStyles({
      setCelebrityStyles,
      setLoading: setcelebrityStylesLoading,
    });
    getAllSales({ setSaleData, setLoading: setsaleLoading });
    getAllGiftcard({ setGiftCards, setLoading: setGiftCardLoading });
    getAllDiscounts({ setDiscountData, setLoading: setDiscountLoading });
    getAllProducts({
      setProductsData: setProducts,
      setLoading: setProductsLoading,
      country: props.country,
      page: undefined,
      limit: undefined,
    });
  }, []);

  const handleOpenForm = (page) => {
    if (page === "Categories") {
      setShowCategoryModal({
        show: true,
        isEdit: false,
        data: {},
      });
    } else if (page === "Testimonials") {
      setShowTestimonialModal({
        show: true,
        isEdit: false,
        data: {},
      });
    } else if (page === "Users") {
      setShowUserModal({
        show: true,
        isEdit: false,
        data: {},
      });
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    // Set isAdmin state based on role
    setIsAdmin(role === "admin");
  }, [props.userUpdated]);

  useEffect(() => {
    const newCategoriesList = categories?.map((category) => ({
      label: category.name,
      value: category.name.toLowerCase().replace(/\s+/g, ""),
    }));
    newCategoriesList.unshift({ label: "All", value: "all" });
    setCategoryList(newCategoriesList);
  }, [categories]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return isAdmin ? (
    <Box>
      {/* Sidebar */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Divider />

          <DrawerHeader>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {dashboardTabValue.map((row) => (
              <ListItem
                key={row.label}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    setTabValue(row.value);
                    setOptions(row.label);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {row.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={row.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {/* Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "16px",
            maxWidth: "100%",
            overflowX: "hidden",
            "@media (max-width: 600px)": {
              padding: "8px",
              maxWidth: "100%",
            },
            "@media (max-width: 768px)": {
              padding: "12px",
              maxWidth: "100%",
            },
          }}
        >
          <Grid2
            container
            sx={{
              // fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Grid2 item>
              <Typography
                variant="h4"
                sx={{
                  color: "#212121",
                  fontFamily: "'Roboto Serif', serif",
                  fontWeight: "600",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.35rem",
                    lg: "1.4rem",
                  },
                }}
              >
                {options}
              </Typography>
            </Grid2>
            <Grid2 item>
              {["Categories", "Testimonials"].includes(options) && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenForm(options)}
                  color="custom"
                  sx={{
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    padding: "10px",
                  }}
                >
                  {`Add ${options}`}
                </Button>
              )}
            </Grid2>
          </Grid2>
          <hr className="footer-line" style={{ marginBottom: "20px" }} />

          {/* Render Content Based on Tab Selection */}
          {tabValue === "one" && (
            <ProductTable
              showModal={showProductModal}
              setShowModal={props.setShowProductModal}
              categories={categories}
              categoryList={categoryList}
              country={props.country}
            />
          )}
          {tabValue === "two" && (
            <ManageCategories
              categories={categories}
              setCategories={setCategories}
              showModal={showCategoryModal}
              setShowModal={setShowCategoryModal}
              loading={categoryloading}
              setLoading={setCategoryLoading}
            />
          )}
          {tabValue === "three" && (
            <ManageTestimonials
              testimonials={testimonials}
              loading={testimonialsloading}
              setLoading={setTestimonialsLoading}
              showModal={showTestimonialModal}
              setShowModal={setShowTestimonialModal}
              setTestimonials={setTestimonials}
            />
          )}
          {tabValue === "four" && (
            <ManageUsers
              users={users}
              loading={usersloading}
              setLoading={setUsersLoading}
              showModal={showUserModal}
              setShowModal={setShowUserModal}
              setUsers={setUsers}
              page="Users"
            />
          )}
          {tabValue === "five" && (
            <ManageOrders
              allOrders={allOrders}
              page="Orders"
              setAllOrders={setAllOrders}
            />
          )}
          {tabValue === "six" && <ProfilePage />}
          {tabValue === "seven" && (
            <ClientsDiaries
              clientDiaries={clientDiaries}
              setClientDiaries={setClientDiaries}
              loading={clientDiariesLoading}
              setLoading={setclientDiariesLoading}
              allProducts={products.products}
            />
          )}
          {tabValue === "eight" && (
            <CelebrityStyle
              celebrityStyles={celebrityStyles}
              setCelebrityStyles={setCelebrityStyles}
              loading={celebrityStylesLoading}
              setLoading={setcelebrityStylesLoading}
              allProducts={products.products}
            />
          )}
          {tabValue === "nine" && (
            <Sale
              saleData={saleData}
              setSaleData={setSaleData}
              loading={saleLoading}
              setLoading={setsaleLoading}
              products={products}
            />
          )}
          {tabValue === "ten" && (
            <GiftCardPage
              giftCards={giftCards}
              setGiftCards={setGiftCards}
              loading={giftCardLoading}
              setLoading={setGiftCardLoading}
            />
          )}
          {tabValue === "eleven" && (
            <ManageDiscount
              discountData={discountData}
              setDiscountData={setDiscountData}
              loading={discountLoading}
              setLoading={setDiscountLoading}
            />
          )}
        </Box>
      </Box>
    </Box>
  ) : (
    <PageNotFound />
  );
};

export default Dashboard;
