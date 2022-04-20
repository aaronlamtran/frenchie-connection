import React, { useState } from "react";
import "./Slider.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Container from "@mui/material/Container";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function CardSlider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 320;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 320;
  };

  const handleSliderClick = (slide) => {
    setImages(slide.largeImages)
    setIsOpen(!isOpen);
  };

  return (
    <Container sx={{ pb: 2, padding: 0.25, marginTop:1}} id="Pups">
      {/* <Typography variant="h5">Pups</Typography> */}
      {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={()=> setIsOpen(false)}
            onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
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
                onClick={()=> handleSliderClick(slide)}
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
                  {slide.color}, {slide.sex}{" "}
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
