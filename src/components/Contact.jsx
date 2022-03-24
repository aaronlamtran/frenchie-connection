/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Container from '@mui/material/Container';

const firstState = {
  message: '', email: '', name: '',
};
function Contact({ data : { location, phone, email, instagram }}) {
  const [state, setState] = useState(firstState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `this will send an email to frenchie connection.
      name:"${state.name}"
      message:"${state.message}"
      email:"${state.email}"
      `,
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((previousState) => ({ ...previousState, [name]: value }));
  };
  return (
    <Container>
      <h3>Contact Us Now</h3>
      <p>Drop your contact information to send us an email. We finna get back to you asap.</p>
      <div>
        <form name="message" onSubmit={handleSubmit}>
          <div>
            <TextField id="outlined-basic" name="name" label="name" onChange={handleChange} variant="outlined" />
          </div>
          <br />
          <div>
            <TextField id="standard-basic" name="email" label="email" onChange={handleChange} variant="outlined" />
          </div>
          <br />
          <div>
            <TextareaAutosize
              aria-label="empty textarea"
              required
              placeholder="message"
              style={{ width: 190, height: 200 }}
              name="message"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">Send Message</Button>
          </div>
        </form>
      </div>

      <div>
        <h3>Contact Info</h3>
        <p>
          <span>
            Address:
          </span>
          {' '}
          {location.address}
        </p>
        <p>
          <span>
            Phone:
          </span>
          {' '}
          {phone}
        </p>
        <p>
          <span>
            Email:
          </span>
          {' '}
          {email}
        </p>
      </div>
    </Container>
  );
}

export default Contact;
