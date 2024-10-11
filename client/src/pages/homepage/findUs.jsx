import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import findUs1 from "../../assets/findus1.png";
import "./../../css/findUs.css";
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
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 1,
          mt: 4,
          fontFamily: "'cinzel', serif",
          fontWeight: "600",
        }}
      >
        FIND US
        <div className="title-border" />
      </Typography>
      <div className="findus-container">
        <NavigateBeforeOutlinedIcon onClick={handleSlideChange} />
        <Card className="card-container">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <CardMedia
                className="card-image"
                component="img"
                height="140"
                image={findUs1}
                alt="find us"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="content-container">
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: " 'Berkshire Swash', serif",
                    fontWeight: "400",
                    fontSize: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {addressSlide ? "Find us at" : "Write us at"}
                </Typography>
                {/* <Divider sx={{ my: 1 }} /> */}
                {addressSlide ? (
                  <>
                    <Typography
                      gutterBottom
                      // variant="h2"
                      component="div"
                      sx={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: {
                          xs: "28px",
                          sm: "32px",
                          md: "36px",
                          lg: "42px",
                        },
                        color: "#006A19",
                        marginBottom: "20px",
                        fontWeight: "600",
                      }}
                    >
                      TheLabel39
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "#494949",
                        fontSize: "18px",
                        fontFamily: "'Roboto Serif', serif",
                        marginBottom: "20px",
                      }}
                    >
                      The Dhanmill, SSN Marg, 100 Feet Road, Chhatarpur, New
                      Delhi, Delhi, 110074
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#494949",
                        fontSize: "16px",
                        fontFamily: "'Roboto Serif', serif",
                      }}
                    >
                      Phone Number: +91 9674949842
                    </Typography>
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
                    <Divider sx={{ margin: "15px" }} />
                    <Typography>Follow us</Typography>
                    <FacebookRoundedIcon />
                    <Instagram />
                  </>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <NavigateNextOutlinedIcon onClick={handleSlideChange} />
      </div>
    </div>
  );
};

export default FindUs;
