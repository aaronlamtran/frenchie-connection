/* eslint-disable no-console */
import React, { useState } from 'react';

const firstState = {
  message: '', email: '', name: '',
};
function ContactForm({ data }) {
  const [state, setState] = useState(firstState);
  const {
    location, phone, email, instagram,
  } = data;

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
    <div>
      <h3>Contact Us</h3>
      <p>Drop your contact information to send us an email. We finna get back to you asap.</p>
      <div>
        <form name="message" onSubmit={handleSubmit}>
          <div>
            <input type="text" id="name" name="name" placeholder="name" onChange={handleChange} />
          </div>
          <div>
            <input type="text" id="email" name="email" placeholder="email" onChange={handleChange} />
          </div>
          <div>
            <textarea type="text" id="message" name="message" placeholder="message" onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Send Message</button>
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
    </div>
  );
}

export default ContactForm;
