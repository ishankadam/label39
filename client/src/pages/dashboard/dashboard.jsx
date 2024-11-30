import { Box, Button, Tab, Tabs, Typography, Grid2 } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
  getAllCategories,
  getAllProducts,
  getAllTestimonials,
} from "../../api";
import { dashboardTabValue, findLabelByValue } from "../../common";
import _ from "lodash";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
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

  useEffect(() => {
    setProductsLoading(true);
    // setCategoryLoading(true);
    // setTestimonialsLoading(true);
    getAllProducts({
      setProductsData: setProducts,
      setLoading: setProductsLoading,
      country: props.country,
    });
    getAllCategories({ setCategories, setLoading: setCategoryLoading });
    // getAllTestimonials({ setTestimonials, setLoading: setTestimonialsLoading });
  }, []);

  const handleOpenForm = (page) => {
    console.log(page);
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

  const handleChange = (value, field) => {
    if (field === "categories") {
      const selected = categories.find(
        (item) =>
          item.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-") ===
          value
      );

      const subcategories =
        selected?.subcategories.map((subcategory) => ({
          label: subcategory.toUpperCase(),
          value: subcategory.toLowerCase().trim(),
        })) || [];
      setCategoryData((prev) => ({
        ...prev,
        subcategories,
      }));
      setFilterOptions((prevDetails) => ({
        ...prevDetails,
        categories: value,
        subcategories: "",
      }));
    } else {
      setFilterOptions((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    }
  };

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
    <>
      <Tabs
        value={tabValue}
        onChange={handleOptions}
        aria-label="wrapped label tabs example"
        centered
        sx={{
          mb: 3,
          color: "#212121",
          fontWeight: "Bold",
          bgcolor: "#33376F",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          "& .MuiTab-root": {
            fontFamily: "'Roboto Serif', serif",
            color: "white", // Ensure tabs are white
            fontWeight: "bold", // Make text bold
            padding: "12px 16px", // Base padding
            fontSize: "13px", // Base font size
            "@media (min-width: 600px)": {
              fontFamily: "'Roboto Serif', serif",
              fontSize: "16px", // Tablet font size
              padding: "14px 20px", // Tablet padding
            },
            "@media (min-width: 960px)": {
              fontFamily: "'Roboto Serif', serif",
              fontSize: "17px", // Laptop font size
              padding: "16px 24px", // Laptop padding
            },
          },
          "& .Mui-selected": {
            color: "white !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "white",
            marginBottom: "1px", // White bottom border when a tab is selected
          },
        }}
      >
        <Tab value="one" label="Products" wrapped />
        <Tab value="two" label="Categories" />
        <Tab value="three" label="Statistics" />
      </Tabs>

      <Grid2
        container
        sx={{
          fontSize: "12px",
          px: 3,
          display: "flex",
          alignContent: "flex-end",
          justifyContent: "space-between",
          alignItems: "center", // Align items vertically center
          flexDirection: {
            xs: options === "Products" ? "column" : "row",
            sm: "row",
          },
        }}
        size={12}
      >
        <Grid2
          sx={{
            order: { xs: 1, sm: 1 },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#212121",
                fontFamily: "'Roboto Serif', serif",
                fontWeight: "Bold",
                textAlign: "left", // Always left-align
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.5rem",
                  lg: "1.7rem",
                },
              }}
            >
              {/* title */}
              {options}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          container
          columnSpacing={0}
          sx={{
            order: { xs: 1, sm: 2 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid2 size={{ xs: "auto", sm: "grow" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {options === "Products" && (
                <>
                  <SelectDropdown
                    label="Category"
                    sx={{
                      minWidth: { xs: "9rem", sm: "12rem", md: "13rem" },
                      marginRight: "20px",
                    }}
                    value={filterOptions.categories}
                    config={{ field: "categories" }}
                    handleEdit={handleChange}
                    optionList={categoryData.categories}
                  />
                  <SelectDropdown
                    label="Sub Category"
                    sx={{
                      minWidth: { xs: "9rem", sm: "12rem", md: "13rem" },
                      marginRight: { xs: "0", sm: "20px" },
                    }}
                    value={filterOptions.subcategories}
                    config={{ field: "subcategories" }}
                    handleEdit={handleChange}
                    optionList={categoryData.subcategories}
                  />
                </>
              )}
            </Box>
          </Grid2>
          <Grid2>
            <Box>
              {" "}
              {options !== "Stats" && (
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
                  {/* btn */}
                  {`Add ${options}`}
                </Button>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>

      {tabValue === "one" && (
        <ProductTable
          products={products}
          setProducts={setProducts}
          // loading={productsloading}
          // setLoading={setProductsLoading}
          // showModal={showProductModal}
          // setShowModal={setShowProductModal}
          // categories={categories}
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
          setTestimonials={setTestimonials}
        />
      )}
    </>
  );
};

export default Dashboard;
