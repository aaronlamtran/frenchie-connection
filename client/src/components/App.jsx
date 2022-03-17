/* eslint-disable no-console */
import React from 'react';
import * as data from '../../../data/mock-data.json';
import ContactForm from './ContactForm';

function App() {
  const {
    Brand, About, Contact, Featured, FAQ, Gallery, Testimonials,
  } = data;
  return (
    <div>
      <div>
        Frenchie Connection
      </div>
      <ContactForm data={Contact} />
    </div>
  );
}

export default App;
