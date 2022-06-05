import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Container from "@mui/material/Container";
import Lightbox from "react-image-lightbox";
import Typography from "@mui/material/Typography";
import "./Slider.css";
import "react-image-lightbox/style.css";
import axios from 'axios'

export default function CardSlider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [gallery, setGallery] = useState([]);
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
    setImages(slide.largeImages);
    setIsOpen(!isOpen);
  };

  const modal = () => (
    <Lightbox
      mainSrc={images[photoIndex]}
      nextSrc={images[(photoIndex + 1) % images.length]}
      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
      onCloseRequest={() => setIsOpen(false)}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + images.length - 1) % images.length)
      }
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
    />
  );
  useEffect(() => {
    let abortController;
    (async function () {
      abortController = new AbortController();
      let signal = abortController.signal;
      const { data } = await axios.get("/gallery", { signal: signal });
      setGallery(data.all);
    })();

    return () => abortController.abort();
  }, []);

  const slides = props.slides;
  // const slides = gallery;
  return (
    <Container sx={{ pb: 2, padding: 0.25, marginTop: 1 }} id="Pups">
      {isOpen && modal()}
      <div id="main-slider-container">
        <ArrowBackIosNewIcon
          className="slider-icon left"
          onClick={slideRight}
        />
        <div id="slider">
          {slides.map((slide, index) => {
            return (
              <div
                className="slider-card"
                key={index + 1}
                onClick={() => handleSliderClick(slide)}
              >
                <div
                  className="slider-card-image"
                  style={{
                    // backgroundImage: `url(${slide.largeImages})`,
                    backgroundImage: `url(${slide.smallImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <Typography variant="h6" sx={{ margin: 1 }}>
                  {slide.name}
                </Typography>
                <Typography variant="body2" sx={{ margin: 1 }}>
                  {slide.color}, {slide.sex}{" "}
                </Typography>
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
