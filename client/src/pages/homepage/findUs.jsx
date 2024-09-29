import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import findUs1 from "../../assets/findus1.png";
import "./findUs.css";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Instagram from "@mui/icons-material/Instagram";
import CustomTextfield from "../../components/textfield/customTextfield";
const FindUs = () => {
  const [addressSlide, setAddressSlide] = useState(true);

  const handleSlideChange = () => {
    setAddressSlide(!addressSlide);
  };
  return (
    <div>
      <Typography variant="h4">FIND US</Typography>
      <div className="findus-container">
        <NavigateBeforeOutlinedIcon onClick={handleSlideChange} />
        <Card className="card-container">
          <CardMedia
            className="card-image"
            component="img"
            height="140"
            image={findUs1}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
              {addressSlide ? "Find us at" : "Write us at"}
            </Typography>
            {addressSlide ? (
              <>
                {" "}
                <Typography gutterBottom variant="h5" component="div">
                  Label39
                </Typography>
                <Typography variant="body2">
                  The Dhanmill, SSN Marg, 100 Feet Road, Chhatarpur, New Delhi,
                  Delhi, 110074
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  +91 9674949842
                </Typography>{" "}
              </>
            ) : (
              <>
                <CustomTextfield
                  multiple={true}
                  sx={{ width: "250px", margin: "0 20px" }}
                ></CustomTextfield>
                <Button variant="contained" color="success">
                  Submit
                </Button>
                <Divider sx={{ margin: "15px" }}></Divider>
                <Typography>Follow us</Typography>
                <FacebookRoundedIcon />
                <Instagram />
              </>
            )}
          </CardContent>
        </Card>
        <NavigateNextOutlinedIcon
          onClick={handleSlideChange}
        ></NavigateNextOutlinedIcon>
      </div>
    </div>
  );
};

export default FindUs;
