/* eslint-disable no-console */
import React from 'react';
import * as data from '../../../data/mock-data.json';
import Contact from './Contact';
import FAQ from './FAQ';

function App() {
  const {
    Brand: brandData,
    About: aboutData,
    Contact: contactData,
    Featured: featuredData,
    FAQ: FAQ_data,
    Gallery: galleryData,
    Testimonials: testimonialData,
  } = data;
  return (
    <div>
      <div>
        Frenchie Connection
      </div>
      <FAQ data={FAQ_data} />
      <Contact data={contactData} />
    </div>
  );
}

export default App;
