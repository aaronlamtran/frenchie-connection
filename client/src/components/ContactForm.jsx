import React, { useState } from 'react';

function ContactForm({data}) {
  const [clientEmail, setclientEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const {
    address, phone, email, facebook, twitter, youtube, instagram,
  } = data;
  return (
    <div>
      Contact
    </div>
  );
}

export default ContactForm;
