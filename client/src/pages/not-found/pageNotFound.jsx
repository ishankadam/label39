import React from "react";
import { Link } from "react-router-dom";
import "../../css/pageNotFound.css";
import { Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Link to="/" className="home-link">
        Go Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
