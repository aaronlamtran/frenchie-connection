/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import data from "../data/mock-data.json";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { storage } from "../config/firebase-config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { v4 } from "uuid";
const tempGallery = data.Gallery;

export default function UploadPhotoAnswer() {
  const initialPreviewState = {};
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dogNameMenu, setDogName] = useState(null);

  useEffect(() => {
    tempGallery.forEach((element) => (initialPreviewState[element.name] = ""));
  }, []);
  const getPreviews = async (name) => {
    try {
      const listRef = ref(storage, `${name}/`);
      const list = await listAll(listRef);
      const promises = list.items.map((ref) => getDownloadURL(ref));
      const result = await Promise.all(promises);
      setImagePreview(result);
    } catch (e) {
      console.log("err from getPreviews", e);
      switch (e.code) {
        case "storage/object-not-found":
          // File doesn't exist
          console.log("file doesnt exist");
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    }
  };

  const handleUpload = (e) => {
    const promises = [];
    const dogName = e.target.id;
    if (dogNameMenu === null) {
      alert("select a name");
      return;
    }
    images.map((image) => {
      const storageRef = ref(storage, `${dogName}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(storageRef)
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            })
            .catch((err) => console.log("err from getDL URL", err));
        }
      );
    });
    // console.log({urls})
    Promise.all(promises)
      .then((result) => {
        alert("All images uploaded");
        console.log("the uploaded result:", result);
      })
      .catch((err) => console.log(err));
  };

  const handlePreview = (e, name) => {
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      const newDisplay = imagePreview[name]
        .slice()
        .concat(Object.values(e.target.files));
      setImagePreview((prev) => {
        return { ...prev, [name]: newDisplay };
      });
    }
  };

  const clearPreview = (e) => {
    // e.preventDefault();
    // setImagePreview([]);
    // setImageCount(0);
    // setImageUpload([]);
  };
  const handleChange = (e) => {
    console.log(e.target.id);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      console.log({ newImage });
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleDogChange = (e) => {
    setDogName(e.target.value);
    getPreviews(e.target.value);
  };

  const isPreviewValid = imagePreview[0] !== undefined;
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
        <Typography align='center' variant="h4">Edit Pups</Typography>
        <Paper sx={{ margin: 1, padding: 2 }}>
          {progress > 0 && <progress value={progress} max="100" />}
          {/* <Typography align='center'> {dogNameMenu || "Select From Menu"}</Typography> */}
          <Box sx={{ margin: "auto" }}>
            <select onChange={handleDogChange}>
              <option value="select"> -- select a dog -- </option>
              {tempGallery.map((dog, idx) => (
                <option key={dog.color} value={dog.name}>
                  {dog.name}
                </option>
              ))}
            </select>
          </Box>
          <br />
          {"  "}
          {imageCount < 20 && (
            <>
              <input
                type="file"
                id={`${dogNameMenu}`}
                accept=".png, .jpg, .jpeg"
                multiple
                onChange={handleChange}
              />
            </>
          )}
          <br />
          <br />
          {images.length > 0 && (
            <>
              <Typography align="center">
                {images.length} photos selected for {dogNameMenu}.
              </Typography>
              <Button
                component="a"
                id={`${dogNameMenu}`}
                onClick={handleUpload}
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
          {dogNameMenu && (
            <>
              <Box alignItems="center" justifyContent="center">
                <Typography>
                  Just Uploaded: {urls.length === 0 && "N/A"}
                </Typography>
                {urls.map((url, idx) => (
                  <Box sx={{ margin: "auto" }}>
                    <img key={idx} src={url} width="300" alt="firebase-img" />
                  </Box>
                ))}
              </Box>
              <Box alignItems="center" justifyContent="center">
                <Typography>
                  Already Existing Photos of {dogNameMenu}: {imagePreview.length === 0 && "N/A"}
                </Typography>
                {imagePreview &&
                  imagePreview.map((url, idx) => (
                    <Box sx={{ margin: "auto" }}>
                      <img key={idx} src={url} width="300" alt="firebase-img" />
                    </Box>
                  ))}
              </Box>
            </>
          )}
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
            <Typography>Delete Selected Photos</Typography>
          </Button>
        </Paper>
      </Box>
    </>
  );
}
