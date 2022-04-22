/* eslint-disable no-console */
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import emailjs from "@emailjs/browser";
import Logo from "./Logo";
const firstState = {
  from_name: "",
  message: "",
  from_email: "",
};
export default function Contact({
  data: {
    location,
    phone,
    email,
    instagram: { url, username },
  },
  handleAddErrorMessages,
  handleAddSuccessMessage,
}) {
  const form = useRef();
  const [state, setState] = useState(firstState);
  const clearState = () => setState({ ...firstState });


  const handleSubmit = (e) => {
    const service_id = process.env.REACT_APP_SERVICE_ID;
    const template_id = process.env.REACT_APP_TEMPLATE_ID;
    // const user_id = process.env.REACT_APP_USER_ID

    e.preventDefault();
    emailjs
      .sendForm(service_id, template_id, form.current, "O46Pu2K33IqgUR57V")
      .then(
        ({ text }) => {
          console.log("email:", text);
          handleAddSuccessMessage("Email Sent! 🐶 ");
          clearState();
        },
        ({ text }) => {
          console.log("email:", text);
          handleAddErrorMessages([
            { msg: "🐶 Server Error. Please try again aater." },
          ]);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((previousState) => ({ ...previousState, [name]: value }));
  };
  return (
    <Box
      sx={{
        padding: 1.5,
        paddingBottom: 10,
        maxWidth: { md: 500 },
        margin: "auto",
        marginTop: 1,
        textAlign: "center",
        justify: "center",
        minHeight: "70vh"
      }}
    >
      <Box sx={{ maxWidth: { md: 400 }, margin: "auto" }}>
        <Box pb={4}>
          <Logo />
        </Box>
        <Typography variant="h4">Contact Us</Typography>
        <Box sx={{ paddingTop: 1 }}>
          <form ref={form} name="message" onSubmit={handleSubmit}>
            <TextField
              required
              autoComplete="new-password"
              margin="dense"
              id="filled-basic"
              type="name"
              name="from_name"
              label="Your name"
              onChange={handleChange}
              variant="filled"
              value={state.from_name}
            />
            <br />
            <TextField
              required
              autoComplete="new-password"
              margin="dense"
              id="filled-basic"
              type="email"
              name="from_email"
              label="Your email"
              onChange={handleChange}
              variant="filled"
              value={state.from_email}
            />
            <br />
            <TextField
              required
              margin="dense"
              multiline
              fullWidth
              rows={5}
              id="filled-basic"
              type="message"
              name="message"
              placeholder="Additional Information"
              onChange={handleChange}
              variant="filled"
              value={state.message}
              sx={{
                paddingBottom: 1,
                maxWidth: { md: 500 },
              }}
            />
            <br />
            <Button variant="contained" type="submit">
              Send
            </Button>
          </form>
        </Box>

          {/* <Typography variant="h5">Contact Info</Typography>
          <Typography>{location.address}</Typography>
          <Typography> {phone}</Typography>
          <Typography>{email}</Typography> */}
      </Box>
    </Box>
  );
}
