/* eslint-disable no-console */
import React from 'react';
import * as data from '../../../data/mock-data.json';
import Contact from './Contact';
import FAQ from './FAQ';
import Nav from './Nav';

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
    <div style={{padding: 10}}>
      <div>
        Frenchie Connection
      </div>
      <Nav/>
      <FAQ data={FAQ_data} />
      <Contact data={contactData} />
    </div>
  );
}

export default App;
