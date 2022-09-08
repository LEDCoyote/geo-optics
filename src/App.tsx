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
        Thin Lens Paraxial Ray Trace
        <DimensionInput />
      </div>
      <Diagram />
      <Rays />
      <Elements />
    </>
  );
}

export default App;
