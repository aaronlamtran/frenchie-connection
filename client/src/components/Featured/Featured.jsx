import React from 'react';
import ListCard from './ListCard';

const Featured = (props) => {
  return (
    <div className='featured-pups'>
      <h3 className='section-header'>Featured Pups</h3>
      <ListCard />
      <button>See Pups</button>
    </div>
  )
};

export default Featured;