import { Typography } from "@mui/material";
import React from "react";
import "../../css/about.css";
import loginImg from "../../assets/login.png";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="image-side">
        <img src={loginImg} alt="Login" />
      </div>
      <div className="form-side">
        <h2>Login</h2>
        <input type="email" placeholder="Email ID" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default AboutUs;
