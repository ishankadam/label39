import { Typography } from "@mui/material";
import React from "react";
import story from "../../assets/story.png";

const OurStory = () => {
  return (
    <div className="story-container">
      <Typography variant="h2">OUR STORY</Typography>
      <div className="story-wrapper" style={{ display: "flex" }}>
        <Typography>
          We are a clothing brand based in Kolkata. We believe in making
          conscious clothing for everyday. We want to be a part of the new ethos
          where we are making thoughtful and personal design which connects the
          wearer with the maker. We work closely with craftsmen and weavers
          across the country to preserve age old techniques and practices of our
          country whilst contemporizing the product. Each piece is a story of
          all the hands that came together in creating it. We want to create
          separates that you will wear time and again ,perhaps in a different
          way each time. Design that is functional yet thoughtful, contemporary
          yet rooted, classic yet versatile. Fashion which celebrates everyday
          together with the special occasions. Clothes that let you breathe
          easy, let you be yourself and yet make you feel good.
        </Typography>
        <img
          key={`story-Thumbnail`}
          src={story}
          alt={`story-Thumbnail`}
          style={{
            width: "400px",
            height: "600px",
            borderRadius: "2%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default OurStory;
