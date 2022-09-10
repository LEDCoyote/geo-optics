import React from 'react';
import './App.css';
import Diagram from './Diagram';
import DimensionInput from './DimensionInput';
import Elements from './Elements';
import Rays from './Rays';

function App() {
  return (
    <>
      <div>
        <a href='https://en.wikipedia.org/wiki/Thin_lens'>Thin Lens</a> <a href='https://en.wikipedia.org/wiki/Paraxial_approximation'>Paraxial</a> Ray Trace (<a href='https://www.ledcoyote.com'>home</a>)
        <DimensionInput />
      </div>
      <Diagram />
      <Rays />
      <Elements />
    </>
  );
}

export default App;
