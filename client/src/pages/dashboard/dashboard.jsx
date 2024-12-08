import { Box, Button, Tab, Tabs, Typography, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  RecentActors as RecentActorsIcon,
} from "@mui/icons-material"; // Import icons
import {
  getAllCategories,
  getAllProducts,
  getAllTestimonials,
} from "../../api";
import { dashboardTabValue, findLabelByValue } from "../../common";
import _ from "lodash";
import ProductTable from "./productTable";
import ManageCategories from "./manageCategory";
import ManageTestimonials from "./manageTestimonials";

const Dashboard = (props) => {
  const [options, setOptions] = useState("Products");
  const [products, setProducts] = useState([]);
  const [filterDataProducts, setfilterDataProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [productsloading, setProductsLoading] = useState(false);
  const [categoryloading, setCategoryLoading] = useState(false);
  const [testimonialsloading, setTestimonialsLoading] = useState(false);
  const [tabValue, setTabValue] = React.useState("one");
  const [filterOptions, setFilterOptions] = useState({
    categories: "",
    subcategories: "",
  });
  const [categoryData, setCategoryData] = useState({
    categories: [],
    subcategories: [],
  });
  const [showCategoryModal, setShowCategoryModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });
  const [showProductModal, setShowProductModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });
  const [showTestimonialModal, setShowTestimonialModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });
  const [sidebarOpen, setSidebarOpen] = useState(false); // Track sidebar open state

  useEffect(() => {
    setProductsLoading(true);
    getAllProducts({
      setProductsData: setProducts,
      setLoading: setProductsLoading,
      country: props.country,
    });
    getAllCategories({ setCategories, setLoading: setCategoryLoading });
    getAllTestimonials({ setTestimonials, setLoading: setTestimonialsLoading });
  }, []);

  const handleOpenForm = (page) => {
    if (page === "Categories") {
      setShowCategoryModal({
        show: true,
        isEdit: false,
        data: {},
      });
    } else if (page === "Products") {
      setShowProductModal({
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
    }
  };

  const handleOptions = (event, newValue) => {
    setOptions(findLabelByValue(dashboardTabValue, newValue));
    setTabValue(newValue);
  };

  useEffect(() => {
    const categoriesArray = categories.map((item) => ({
      label: item.name.toUpperCase(),
      value: item.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-"),
    }));

    setCategoryData((prev) => ({
      ...prev,
      categories: categoriesArray,
    }));
  }, [categories]);

  // const handleChange = (value, field) => {
  //   if (field === "categories") {
  //     const selected = categories.find(
  //       (item) =>
  //         item.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-") ===
  //         value
  //     );
  //     const subcategories =
  //       selected?.subcategories.map((subcategory) => ({
  //         label: subcategory.toUpperCase(),
  //         value: subcategory.toLowerCase().trim(),
  //       })) || [];
  //     setCategoryData((prev) => ({
  //       ...prev,
  //       subcategories,
  //     }));
  //     setFilterOptions((prevDetails) => ({
  //       ...prevDetails,
  //       categories: value,
  //       subcategories: "",
  //     }));
  //   } else {
  //     setFilterOptions((prevDetails) => ({
  //       ...prevDetails,
  //       [field]: value,
  //     }));
  //   }
  // };

  useEffect(() => {
    const filteredList = (products || []).filter((item) => {
      const categoryFilter = filterOptions.categories
        ? item.category === _.lowerCase(filterOptions.categories)
        : true;

      const subcategoryFilter = filterOptions.subcategories
        ? item.subcategory === _.lowerCase(filterOptions.subcategories)
        : true;

      return categoryFilter && subcategoryFilter;
    });

    setfilterDataProducts(filteredList);
  }, [filterOptions, products]);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 250 : 70,
          backgroundColor: "#D7B4A7",
          color: "white",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",

          transition: "width 0.3s ease",
          "&:hover": {
            width: 250,
          },
        }}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <Tabs
          value={tabValue}
          onChange={handleOptions}
          aria-label="wrapped label tabs example"
          orientation="vertical"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            "& .MuiTab-root": {
              fontFamily: "'Roboto Serif', serif",
              color: "white",
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              color: "white !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
            },
          }}
        >
          {dashboardTabValue.map((row) => {
            return (
              <Tab
                sx={{ justifyContent: "flex-start" }}
                value={row.value}
                label={sidebarOpen ? row.label : ""}
                icon={row.icon}
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, padding: "16px" }}>
        <Grid2
          container
          sx={{
            fontSize: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid2 item>
            <Typography
              variant="h4"
              sx={{
                color: "#212121",
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "Bold",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.5rem",
                  lg: "1.7rem",
                },
              }}
            >
              {options}
            </Typography>
          </Grid2>
          <Grid2 item>
            <Button
              variant="contained"
              onClick={() => handleOpenForm(options)}
              color="warning"
              sx={{
                fontSize: { xs: "13px", sm: "14px", md: "16px" },
                textTransform: "capitalize",
                minWidth: "120px",
                height: "56px",
                marginTop: "16px !important",
                marginBottom: "8px !important",
              }}
            >
              {`Add ${options}`}
            </Button>
          </Grid2>
        </Grid2>

        {/* Render Content Based on Tab Selection */}
        {tabValue === "one" && (
          <ProductTable
            products={products}
            setProducts={setProducts}
            loading={productsloading}
            setLoading={setProductsLoading}
            showModal={showProductModal}
            setShowModal={setShowProductModal}
            categories={categories}
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
      </Box>
    </Box>
  );
};

export default Dashboard;
