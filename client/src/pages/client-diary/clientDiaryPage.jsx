import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import ClientDiaryCard from "./clientDiaryCard";

const clientDiaries = [
  {
    id: 1,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestSeller13.jpg-eTngnNH8lK3Sj8bqXnIqzgzBJamo3M.jpeg",
    title: "Red Embroidered Suit Set",
  },
  {
    id: 2,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestSeller10.jpg-PqaRmmU9Ca7xe5TZfkC2IxCQjzhlYF.jpeg",
    title: "Black Cape Jumpsuit",
  },
  {
    id: 3,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestSellerP2.jpg-WDnns1T2DL3M2dl7eqLby8L2cjOd7I.jpeg",
    title: "White Embroidered Shirt",
  },
  {
    id: 4,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestSeller11.jpg-iRx6Ia5IdhEG9qzVwdA6Uwf6c6j8Y3.jpeg",
    title: "Yellow Floral Kurti",
  },
  {
    id: 5,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestSeller9.jpg-xfiWibN2yzAIBzDWrYdSOolgHvYetz.jpeg",
    title: "Green Floral Print Shirt",
  },
  {
    id: 6,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestSeller12.jpg-FIH1FcxT3sgqfwYarEAxiIFGhYmGDu.jpeg",
    title: "Olive Green Embroidered Suit",
  },
];

function ClientDiaryPage() {
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
          Client Diaries
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
          {clientDiaries.map((diary) => (
            <Grid item xs={6} sm={6} md={4} key={diary.id}>
              <ClientDiaryCard imageUrl={diary.imageUrl} title={diary.title} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ClientDiaryPage;
