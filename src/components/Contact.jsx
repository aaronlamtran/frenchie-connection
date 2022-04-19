/* eslint-disable no-console */
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InstagramIcon from "@mui/icons-material/Instagram";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import emailjs from "@emailjs/browser";
const firstState = {
  from_name: "",
  message: "",
  from_email: "",
};
function Contact({
  data: {
    location,
    phone,
    email,
    instagram: { url, username },
  },
}) {
  const form = useRef();
  const [state, setState] = useState(firstState);
  const clearState = () => setState({ ...firstState });
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_euf2g9i",
        "template_y14df1w",
        form.current,
        "O46Pu2K33IqgUR57V"
      )
      .then(
        ({ text }) => {
          console.log("email:", text);
          clearState();
        },
        ({ text }) => {
          console.log("email:", text);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((previousState) => ({ ...previousState, [name]: value }));
  };
  return (
    <Paper sx={{ padding: 1.5, paddingBottom: 10 }}>
      <Container id="Contact">
        <Typography variant="h5">Contact Us</Typography>
        <Typography variant="p">
          Drop your contact information to send us an email. We finna get back
          to you asap.
        </Typography>
        <Box sx={{ paddingTop: 1 }}>
          <form ref={form} name="message" onSubmit={handleSubmit}>
            <TextField
              required
              autoComplete="new-password"
              margin="dense"
              id="filled-basic"
              type="name"
              name="from_name"
              label="name"
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
              label="email"
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
              placeholder="message"
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
              Send Message
            </Button>
          </form>
        </Box>

        <Box sx={{ paddingTop: 1 }}>
          <Typography variant="h5">Contact Info</Typography>
          <Typography>{location.address}</Typography>
          <Typography> {phone}</Typography>
          <Typography>{email}</Typography>
        </Box>
        <InstagramIcon onClick={() => openInNewTab(url)} />
      </Container>
    </Paper>
  );
}

export default Contact;
