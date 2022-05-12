import React, { useState } from "react";
import data from "../data/mock-data.json";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { storage } from "../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
console.log(data.Gallery);
const tempGallery = data.Gallery;

export default function UploadPhotoAnswer() {
  const [photos, setPhotos] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const handleFileUpload = (e, name) => {
    e.preventDefault();
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${name}/${v4()}`);
    console.log({ imageUpload });
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        console.log("image uploaded");
      })
      .then(() => {
        clearPreview();
      });
    // }
  };
  const handlePreview = (e, name) => {
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      const newDisplay = imagePreview
        .slice()
        .concat(Object.values(e.target.files));
      setImagePreview(newDisplay);
      // preparePhotos(newDisplay);
    }
  };

  // const preparePhotos = (photoUploads) => {
  //   const urls = photoUploads.map((photo) => URL.createObjectURL(photo));
  //   setPhotos(urls);
  // };
  const clearPreview = (e) => {
    e.preventDefault();
    setImagePreview([]);
    setImageCount(0);
    // preparePhotos([]);
    setImageUpload([]);
  };

  return (
    <>
      <Box className="photo-upload">
        {tempGallery.map((dog, idx) => (
          <Paper sx={{ margin: 1 }}>
            <Typography> {dog.name}</Typography>
            <br />
            {"  "}
            {imageCount < 5 && (
              <>
                <input
                  type="file"
                  id={`${dog.name}`}
                  accept=".png, .jpg, .jpeg"
                  multiple
                  onChange={(e) => {
                    handlePreview(e, dog.name);
                    setImageUpload(e.target.files[0]);
                  }}
                />
                <Button
                  component="a"
                  onClick={(e) => handleFileUpload(e, dog.name)}
                  sx={{
                    my: 1,
                    color: "black",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Upload
                </Button>
              </>
            )}
            <br />
            <br />
            <Typography>You selected {imageCount} photos.</Typography>
            {imagePreview.map((img) => (
              <>
                <img
                  src={URL.createObjectURL(img)}
                  value={URL.createObjectURL(img)}
                  height="100"
                  alt=""
                />
              </>
            ))}
            <br />
            <Button
              component="a"
              sx={{
                my: 1,
                color: "black",
                display: "block",
                textAlign: "center",
              }}
              onClick={(e) => clearPreview(e)}
            >
              <Typography>Clear Photos</Typography>
            </Button>
          </Paper>
        ))}
      </Box>
    </>
  );
}
