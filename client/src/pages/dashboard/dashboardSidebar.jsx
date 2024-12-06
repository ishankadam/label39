import React from "react";
import { Box, List, ListItem, ListItemText, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = ({ tabValue, setTabValue }) => {
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    // Set the active tab
    setTabValue(tab);
    // Navigate to the appropriate section (optional if you want to update the URL)
    navigate(`/dashboard/${tab}`);
  };

  return (
    <Drawer
      sx={{
        marginTop: "100px", // Adjust this based on your header height
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ width: "100%", paddingTop: 2 }}>
        <List>
          {/* Products Tab */}
          <ListItem
            button
            onClick={() => handleNavigation("one")}
            selected={tabValue === "one"} // Highlight active tab
            sx={{
              backgroundColor: tabValue === "one" ? "#1976d2" : "transparent", // Highlight selected tab
              color: tabValue === "one" ? "white" : "inherit", // Change color for selected tab
            }}
          >
            <ListItemText primary="Products" />
          </ListItem>

          {/* Categories Tab */}
          <ListItem
            button
            onClick={() => handleNavigation("two")}
            selected={tabValue === "two"}
            sx={{
              backgroundColor: tabValue === "two" ? "#1976d2" : "transparent",
              color: tabValue === "two" ? "white" : "inherit",
            }}
          >
            <ListItemText primary="Categories" />
          </ListItem>

          {/* Testimonials Tab */}
          <ListItem
            button
            onClick={() => handleNavigation("three")}
            selected={tabValue === "three"}
            sx={{
              backgroundColor: tabValue === "three" ? "#1976d2" : "transparent",
              color: tabValue === "three" ? "white" : "inherit",
            }}
          >
            <ListItemText primary="Testimonials" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;
