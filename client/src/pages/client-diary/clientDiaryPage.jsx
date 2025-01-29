import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ViewProductModal from "../product/viewProduct";
import ClientDiaryCard from "./clientDiaryCard";

const ClientDiaryPage = (props) => {
  const [clientDiaries, setclientDiaries] = useState([]);
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  useEffect(() => {
    setclientDiaries(props.clientDiaries);
  }, [props.clientDiaries]);

  return (
    <>
      <Box sx={{ bgcolor: "#FFF8F5", py: 4, borderTop: "1px solid #E5E5E5" }}>
        <Container maxWidth="lg">
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
            client diaries
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
            {clientDiaries.length > 0 ? (
              clientDiaries.map((diary) => (
                <Grid item xs={6} sm={6} md={4} key={diary.id}>
                  <ClientDiaryCard
                    clientDiary={diary}
                    setShowModal={setShowModal}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
                No client diaries found
              </Typography>
            )}
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
    </>
  );
};

export default ClientDiaryPage;
