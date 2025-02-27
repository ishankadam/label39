import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footer from "../homepage/footer";
import ViewProductModal from "../product/viewProduct";
import "./../../css/categorySection.css";
import CelebrityStyleCard from "./celebrityStyleCard";

function CelebrityStylePage(props) {
  const [celebrityStyles, setCelebrityStyles] = useState([]);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  useEffect(() => {
    setCelebrityStyles(props.celebrityStyles);
  }, [props.celebrityStyles]);


  return (
    <>
      <Box sx={{ bgcolor: "#FFF8F5", py: 4, borderTop: "1px solid #E5E5E5" }}>
        <Container maxWidth="xl" sx={{ mb: "150px" }}>
          <Typography
            sx={{
              fontSize: { xs: "26px", sm: "28px", md: "32px", lg: "34px" },
              color: "#2f3e4e",
              textAlign: "center",
              mb: 6,
              fontFamily: "'cinzel', serif",
              fontWeight: "500",
            }}
          >
            celebrity style
            <div
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
          <Grid container spacing={{ xs: 2, sm: 4, lg: 4 }}>
            {celebrityStyles.map((celebrityDiary, index) => {
              return (
                <Grid
                  sx={{ marginBottom: "16px" }}
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  key={`${index}-client-diary`}
                >
                  <CelebrityStyleCard
                    celebrityDiary={celebrityDiary}
                    setShowModal={setShowModal}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      {showModal.open ? (
        <ViewProductModal
          open={showModal.open}
          product={showModal.data}
          setShowModal={setShowModal}
        ></ViewProductModal>
      ) : null}
      <Footer />
    </>
  );
}

export default CelebrityStylePage;
