import React, { useState, useEffect } from "react";
import data from "../data/mock-data.json";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { storage } from "../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// console.log(data.Gallery);
const tempGallery = data.Gallery;

export default function UploadPhotoAnswer() {
  const initialPreviewState = {};
  useEffect(()=> {

    tempGallery.forEach(element => initialPreviewState[element.name]='')
    {console.log(initialPreviewState)}
  },[])
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialPreviewState);
  const [imageCount, setImageCount] = useState(0);
  const handleFileUpload = (e, name) => {
    e.preventDefault();
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${name}/${v4()}`);
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
      const newDisplay = imagePreview[name]
        .slice()
        .concat(Object.values(e.target.files));
      setImagePreview(prev =>{ return {...prev, [name]: newDisplay}});
    }
  };

  const clearPreview = (e) => {
    e.preventDefault();
    setImagePreview([]);
    setImageCount(0);
    setImageUpload([]);
  };

  const isPreviewValid = imagePreview[0] !== undefined
  return (
    <>
      <Box
        className="photo-upload"
        sx={{
          padding: 0.1,
          paddingTop: 2,
          marginBottom: 1,
          paddingBottom: 5,
          margin: "auto",
          marginTop: 1,
          maxWidth: 900,
        }}
        >
        {tempGallery.map((dog, idx) => (
          <Paper sx={{ margin: 1 }}>
            <Typography> {dog.name}</Typography>
            <br />
            {"  "}
            {imageCount < 20 && (
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
            {console.log(imagePreview[dog.name])}

            {isPreviewValid &&  imagePreview[dog.name].map((dog, idx) => (
              <>
                <img
                  src={URL.createObjectURL(dog.name[idx])}
                  value={URL.createObjectURL(dog)}
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
