import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getInstagramPosts } from "../../api";
import "./Slider.css"; // Assuming you have the relevant CSS file here

const InstagramSection = () => {
  const [instagramData, setInstagramData] = useState([]);
  const [instaPosts, setInstaPosts] = useState([]);
  const [, setLoading] = useState(false);
  useEffect(() => {
    getInstagramPosts({ setInstagramData: setInstagramData, setLoading });
  }, []);

  useEffect(() => {
    const instagramPostData = instagramData.filter(
      (row) => row.media_type === "IMAGE" || row.media_type === "CAROUSEL_ALBUM"
    );
    setInstaPosts(instagramPostData);
  }, [instagramData]);

  return (
    <Box>
      <Box
        sx={{
          background: "#F7ECE9",
          paddingTop: { xs: "20px", sm: "28px", md: "36px" },
        }}
      >
        <Typography
          sx={{
            color: "#2f3e4e",
            textAlign: "center",
            mb: 1,
            fontFamily: "'cinzel', serif",
            fontWeight: "500",
            fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
          }}
        >
          join us on instagram
          <Box
            className="title-border"
            style={{
              width: "70px",
              height: "3px",
              borderRadius: "100px",
              backgroundColor: "#2f3e4e",
              margin: "0 auto",
            }}
          />
        </Typography>
        <Box className="slider-main">
          <Box
            className="slider"
            reverse="true"
            style={{
              "--width": "300px",
              "--height": "300px",
              "--quantity": instaPosts.length,
              cursor: "pointer",
            }}
          >
            <Box className="list">
              {instaPosts.map((post, index) => {
                return (
                  <Box
                    className="item"
                    key={index}
                    style={{ "--position": index + 1 }}
                    onClick={() => {
                      window.open(post.permalink);
                    }}
                  >
                    <img
                      src={post.media_url}
                      alt={`Slide ${index + 1}`}
                      className="slider-img"
                    />
                    <Box className="overlay">
                      <Typography variant="h6" className="overlay-text">
                        {post.caption}
                      </Typography>
                      <Typography variant="body1" className="overlay-date">
                        {post.date}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            href="https://www.instagram.com/thelabel39/"
            variant="contained"
            color="custom"
            sx={{ width: "120px", borderRadius: "20px" }}
          >
            JOIN US
          </Button>
        </Box>
        <hr
          className="footer-line"
          style={{
            marginTop: "24px",
            borderTop: "1px solid #d6d6d6 !important",
          }}
        />
      </Box>
    </Box>
  );
};

export default InstagramSection;
