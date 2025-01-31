import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
          {clientDiaries.map((diary) => {
            console.log(diary);
            return (
              <Grid item xs={6} sm={6} md={4} key={diary.id}>
                <ClientDiaryCard diary={diary} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientDiaryPage;
