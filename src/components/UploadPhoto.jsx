/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
// import data from "../data/mock-data.json";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import ProgressCustom from "./ProgressCustom";
import Typography from "@mui/material/Typography";
import SickSpinner from "../utils/SickSpinner";
import { storage } from "../config/firebase-config";
import Slider from "./Slider";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
// import { v4 } from "uuid";
import axios from "axios";

export default function UploadPhoto() {
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [tempGallery, setTempGallery] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(false);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dogNameMenu, setDogName] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [currentDogID, setCurrentDogID] = useState("");
  const [optionChange, setOptionChange] = useState("");
  const [preparedDelete, setPreparedDelete] = useState([]);
  const selectIsNotSelected = dogNameMenu !== null && dogNameMenu !== "select";
  const [carousel, setCarousel] = useState([])
  if (modal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  useEffect(() => {
    let abortController;
    (async function () {
      abortController = new AbortController();
      let signal = abortController.signal;
      const { data } = await axios.get("/gallery", { signal: signal });
      setTempGallery(data.all);
    })();

    setSpinner(false);
    return () => abortController.abort();
  }, []);

  const getGallery = async () => {
    const { data } = await axios.get("/gallery");
    setTempGallery(data.all);
    // return data.all;
  };

  const filterForGallery = (array, id) => {
    array.forEach(dog => console.log(dog._id, id))
    const result = array.filter(dog => dog._id === id)
    console.log('68', result)
    setCarousel(result)
  }

  const updateDbUrls = async (name, identificationNum) => {
    try {
      const listRef = ref(storage, `${name}/`);
      const list = await listAll(listRef);
      const promises = list.items.map((ref) => getDownloadURL(ref));
      const result = await Promise.all(promises);
      const result_two = await axios.put(
        `gallery/update/${identificationNum}`,
        { urls: result }
      );
      console.log("74", result_two);
      // setImagePreview(result);
    } catch (e) {
      console.log("77", e);
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
          console.log("116", error);
        },
        async () => {
          await getDownloadURL(storageRef)
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            })
            .catch((err) => console.log("err getDL URL", err));
        }
      );
    });

    Promise.all(promises)
      .then((result) => {
        console.log("130:", result);
      })
      .then(() => updateDbUrls(dogNameMenu, currentDogID))
      .then(() => setImages([]))
      .then(() => setTimeout(() => setProgress(0), 10000))
      .then(() => listDir())
      .catch((err) => console.log(err));
  };

  const handleSelection = (e) => {
    e.preventDefault();
    const newState = imagePreview.map((image, idx) => {
      const isIndexMatch = idx === parseInt(e.target.id, 10);
      if (isIndexMatch) return !imagesSelected[idx];
    });

    setImagesSelected(newState);
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      console.log("153", newImage);
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleDogChange = (e) => {
    setSpinner(true);
    listDir();
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const id = el.getAttribute("id");
    setCurrentDogID(id);
    setOptionChange(e.target.value);
    setDogName(e.target.value);
    setProgress(0);
    setImages([]);
    setUrls([]);
    getGallery();
    setSpinner(false);
    filterForGallery(tempGallery, id)
    const selectedDogImages = tempGallery.filter((dog) => dog._id === id)[0]
      .largeImages;
    setImagePreview(selectedDogImages);
  };

  const handleDeleteDog = async () => {
    // TODO delete folder from firebase
    if (dogNameMenu === null) return;
    const result = await axios.delete(`/gallery/${currentDogID}`);
    await deleteItemsInFirebaseDir();
    if (result.status) {
      alert("successfully deleted");
      setDogName(null);
    }
    await getGallery();
  };

  const handleAddDog = async () => {
    const newDog = { name, breed, color, sex };
    const result = await axios.post("/gallery/", newDog);
    if (result.status) {
      alert("Dog added successfully. Go upload photos now.");
    }
    setModal(!modal);
    setName("");
    setSex("");
    setBreed("");
    setColor("");
    await getGallery();
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  const listDir = () => {
    if (!selectIsNotSelected) return;
    const listRef = ref(storage, `/${dogNameMenu}/`);
    listAll(listRef)
      .then((result) => setPreparedDelete(result))
      .catch((err) => console.log("211:", err));
  };

  const deleteItemsInFirebaseDir = () => {
    const promises = preparedDelete.items.map((item) => {
      const imageRef = ref(storage, item._location.path);
      return deleteObject(imageRef)
        .then((result) => console.log("261:", { result }))
        .catch((err) => console.log("262:", err));
    });
    console.log({ promises });
    Promise.all(promises)
      .then((result) => console.log("264:", { result }))
      .catch((err) => console.log("265:", err));
  };

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
        <Typography align="center" variant="h4">
          Edit Pups
        </Typography>
        <Paper sx={{ margin: 1, padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <select onChange={handleDogChange} value={optionChange}>
              <option value="select"> -- select a dog -- </option>
              {tempGallery.map((dog, idx) => (
                <option key={dog._id} value={dog.name} id={dog._id}>
                  {dog.name}
                </option>
              ))}
            </select>
          </Box>
          <br />
          <Typography align="center" >
            Preview
          </Typography>
          {selectIsNotSelected && <Slider slides={carousel} preview={true}/>}
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            {images.length > 0 && (
              <Typography sx={{ paddingTop: 1 }}>
                {images.length} photos selected for {dogNameMenu}.
              </Typography>
            )}
            {selectIsNotSelected && (
              <label htmlFor={dogNameMenu}>
                <Button sx={{ margin: 1 }} variant="contained" component="span">
                  Choose Photos
                </Button>
                <input
                  style={{ display: "none" }}
                  name="contained-button-file"
                  type="file"
                  id={`${dogNameMenu}`}
                  accept=".png, .jpg, .jpeg"
                  multiple
                  onChange={handleChange}
                />
              </label>
            )}<br/>
            {spinner && <SickSpinner />}
            {images.length > 0 && (
              <Button
                component="a"
                variant="contained"
                id={`${dogNameMenu}`}
                onClick={handleUpload}
                sx={{
                  margin: 1,
                  my: 1,
                  // color: "black",
                  bgcolor: "lightgreen",
                  // display: "block",
                  textAlign: "center",
                }}
              >
                Upload
              </Button>
            )}
            <br />
            {progress > 0 && <ProgressCustom value={progress} />}
            {/* {progress > 0 && <progress value={progress} max="100" />} */}
          </Box>
          {dogNameMenu && (
            <>
              <Box alignItems="center" justifyContent="center">
                {selectIsNotSelected && (
                  <Typography>
                    Just uploaded:{" "}
                    {urls.length > 0 ? urls.length + " images" : "N/A"}
                  </Typography>
                )}
                {urls.map((url, idx) => (
                  <Box sx={{ margin: "auto" }}>
                    <img key={url} src={url} width="300" alt="firebase-img" />
                  </Box>
                ))}
              </Box>
              <Box  sx={{ display: "flex", flexDirection:'column',  justifyContent:"center"}}>
                <Typography>
                  {dogNameMenu === "select"
                    ? ""
                    : `Already Existing Photos of ${dogNameMenu}:`}
                  {imagePreview.length === 0 && "N/A"}
                </Typography>
                {dogNameMenu !== "select" &&
                  imagePreview.map((url, idx) => (
                    <Box sx={{ margin: "auto" }}>
                      <img
                        id={url}
                        key={url}
                        name={idx}
                        src={url}
                        width="300"
                        border={imagesSelected[idx] && 23}
                        alt="firebase-img"
                        onClick={handleSelection}
                      />
                    </Box>
                  ))}
              </Box>
            </>
          )}
          <br />

          {modal && (
            <Box className="modal" sx={{ margin: "auto" }}>
              <Box className="modal-overlay">
                <Box className="modal-content">
                  <Typography variant="h5" align="center">
                    Add A Pup
                  </Typography>
                  <Box
                    display="flex"
                    // bgcolor="lightgreen"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box sx={{ maxWidth: 200 }}>
                      <form>
                        <Input
                          sx={{ margin: 1 }}
                          placeholder="name"
                          onChange={(e) => setName(e.target.value)}
                        ></Input>
                        <Input
                          sx={{ margin: 1 }}
                          placeholder="breed"
                          onChange={(e) => setBreed(e.target.value)}
                        ></Input>
                        <Input
                          sx={{ margin: 1 }}
                          required
                          placeholder="color"
                          onChange={(e) => setColor(e.target.value)}
                        ></Input>
                        <Box
                          sx={{ margin: 1 }}
                          onChange={(e) => setSex(e.target.value)}
                        >
                          <Typography
                            variant="caption"
                            sx={{ paddingRight: 1 }}
                          >
                            sex:
                          </Typography>
                          <input type="radio" value="Male" name="gender" />{" "}
                          <Typography
                            variant="caption"
                            sx={{ paddingRight: 1 }}
                          >
                            Male
                          </Typography>
                          <input type="radio" value="Female" name="gender" />{" "}
                          <Typography variant="caption">Female</Typography>
                          <br />
                        </Box>
                        <Button
                          component="a"
                          type="submit"
                          sx={{
                            my: 1,
                            color: "black",
                            display: "block",
                            textAlign: "center",
                          }}
                          onClick={handleAddDog}
                        >
                          <Typography>Submit</Typography>
                        </Button>
                        <Button
                          component="a"
                          sx={{
                            my: 1,
                            color: "black",
                            display: "block",
                            textAlign: "center",
                          }}
                          onClick={toggleModal}
                        >
                          <Typography>Cancel</Typography>
                        </Button>
                      </form>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {/* end modal */}
        </Paper>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Button
            variant="contained"
            component="span"
            sx={{
              my: 1,
              bgcolor: "lightgreen",
              margin: 1,
              color: "black",
              // display: "block",
              textAlign: "center",
            }}
            onClick={toggleModal}
          >
            <Typography>Add A New Pup</Typography>
          </Button>
          {selectIsNotSelected && (
            <Button
              component="a"
              variant="contained"
              sx={{
                margin: 1,
                marginTop: 100,
                my: 1,
                color: "black",
                bgcolor: "pink",
                // display: "block",
                textAlign: "center",
              }}
              onClick={handleDeleteDog}
            >
              <Typography>
                {dogNameMenu && `Delete Pup: ${dogNameMenu}`}
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
