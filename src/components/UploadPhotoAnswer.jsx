/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
// import data from "../data/mock-data.json";
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
// import { v4 } from "uuid";
import axios from "axios";
import { CurrencyBitcoin } from "@mui/icons-material";

export default function UploadPhotoAnswer() {
  const [modal, setModal] = useState(false);
  const [tempGallery, setTempGallery] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dogNameMenu, setDogName] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [currentDog, setCurrentDog] = useState({});
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [currentDogID, setCurrentDogID] = useState("");
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

    return () => abortController.abort();
  }, []);

  const getGallery = async () => {
    const { data } = await axios.get("/gallery");
    setTempGallery(data.all);
    return data.all;
  };
  const updateDBGalleryImages = async () => {
    console.log({ currentDogID, urls, imagePreview });
    await axios.put(`gallery/update/${currentDogID}`, { body: imagePreview });
  };
  const getPreviews = async (name, identificationNum) => {
    try {
      const listRef = ref(storage, `${name}/`);
      const list = await listAll(listRef);
      const promises = list.items.map((ref) => getDownloadURL(ref));
      const result = await Promise.all(promises);
      console.log("from get Previews", result);
      console.log({ identificationNum, result });
      const result_two = await axios.put(
        `gallery/update/${identificationNum}`,
        { urls: result }
      );
      console.log({ result_two });
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

    Promise.all(promises)
      .then((result) => {
        console.log("the uploaded result:", result);
      })
      .then(() => getPreviews(dogNameMenu, currentDogID))
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

  const handleSelection = (e) => {
    e.preventDefault();
    const newState = imagePreview.map((image, idx) => {
      const isIndexMatch = idx === parseInt(e.target.id, 10);
      if (isIndexMatch) return !imagesSelected[idx];
    });

    setImagesSelected(newState);
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
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const id = el.getAttribute("id");
    setCurrentDogID(id);
    getPreviews(e.target.value, id);
    setProgress(0);
    setImages([]);
    setUrls([]);
  };

  const handleDeleteDog = async () => {
    // TODO delete folder from firebase
    const result = await axios.delete(`/gallery/${currentDogID}`);
    if (result.status) {
      alert("successfully deleted");
      setDogName(null);
    }
    await getGallery();
  };

  const handleDeletePhotos = async () => {
    const result = await axios.put(`/gallery/${currentDogID}`);
    // TODO also delete from firebase storage
    console.log("result from handle delete photos", result);
  };

  const handleAddDog = async () => {
    const newDog = { name, breed, color, sex };
    const result = await axios.post("/gallery/", newDog);
    console.log({ result });
    if (result.status) {
      alert("success. go upload photos now.");
    }
    setModal(!modal);
    setName("");
    setSex("");
    setBreed("");
    setColor("");
    await getGallery();
  };
  const toggleModal = () => {
    // setProductName2(document.getElementById('product-name').innerHTML);
    setModal(!modal);
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
          {progress > 0 && <progress value={progress} max="100" />}
          <Box sx={{ margin: "auto" }}>
            <select onChange={handleDogChange}>
              <option value="select"> -- select a dog -- </option>
              {tempGallery.map((dog, idx) => (
                <option value={dog.name} id={dog._id}>
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
                  Already Existing Photos of {dogNameMenu}:{" "}
                  {imagePreview.length === 0 && "N/A"}
                </Typography>
                {imagePreview &&
                  imagePreview.map((url, idx) => (
                    <Box sx={{ margin: "auto" }}>
                      <img
                        id={idx}
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
                  <form>
                    <input
                      placeholder="name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <br />
                    <div onChange={(e) => setSex(e.target.value)}>
                      <input type="radio" value="Male" name="gender" />{" "}
                      <Typography>Male</Typography>
                      <input type="radio" value="Female" name="gender" />{" "}
                      <Typography>Female</Typography>
                    </div>
                    <br />
                    <input
                      placeholder="breed"
                      onChange={(e) => setBreed(e.target.value)}
                    ></input>
                    <br />
                    <input
                      required
                      placeholder="color"
                      onChange={(e) => setColor(e.target.value)}
                    ></input>
                    <br />
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
                  </form>
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
                </Box>
              </Box>
            </Box>
          )}
          {/* end modal */}
          <Button
            component="a"
            sx={{
              my: 1,
              color: "black",
              display: "block",
              textAlign: "center",
            }}
            onClick={handleDeletePhotos}
          >
            <Typography>
              {dogNameMenu === null || dogNameMenu === "select"
                ? ""
                : `Delete ALL Photos of: ${dogNameMenu}`}
            </Typography>
          </Button>
          <Button
            component="a"
            sx={{
              my: 1,
              color: "black",
              display: "block",
              textAlign: "center",
            }}
            onClick={handleDeleteDog}
          >
            <Typography>Delete Selected Pup: {dogNameMenu}</Typography>
          </Button>
        </Paper>
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
          <Typography>Add A New Pup</Typography>
        </Button>
      </Box>
    </>
  );
}
