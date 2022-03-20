/* eslint-disable no-console */
import React from 'react';
import * as data from '../../../data/mock-data.json';
import ContactForm from './ContactForm';
import FAQcomponent from './FAQ';

function App() {
  const {
    Brand, About, Contact, Featured, FAQ, Gallery, Testimonials,
  } = data;
  return (
    <div>
      <div>
        Frenchie Connection
      </div>
      <FAQcomponent data={FAQ} />
      <ContactForm data={Contact} />
    </div>
  );
}

export default App;
