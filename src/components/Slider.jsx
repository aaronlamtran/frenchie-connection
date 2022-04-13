import React from "react";
import "./Slider.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

function CardSlider(props) {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 320;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 320;
  };

  const handleSliderClick = (slider) => {
    console.log("this is going to open pup details");
  };

  return (
    <Container sx={{ pb: 2}} id="Pups">
      {/* <Typography variant="h5">Pups</Typography> */}
      <div id="main-slider-container">
        <ArrowBackIosNewIcon
          className="slider-icon left"
          onClick={slideRight}
        />
        <div id="slider">
          {props.slides.map((slide, index) => {
            return (
              <div
                className="slider-card"
                key={index + 1}
                onClick={() => handleSliderClick()}
              >
                <div
                  className="slider-card-image"
                  style={{
                    backgroundImage: `url(${slide.smallImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <p className="slider-card-title">{slide.name}</p>
                <p className="slider-card-description">
                  {slide.breed}, {slide.color}, {slide.price}{" "}
                </p>
              </div>
            );
          })}
        </div>
        <ArrowForwardIosIcon
          className="slider-icon right"
          onClick={slideLeft}
        />
      </div>
    </Container>
  );
}
export default CardSlider;
