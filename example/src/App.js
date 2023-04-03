import React, { useState, useEffect, useRef } from "react";

import AngleRange from 'react-angle-range';
//import 'react-angle-range/dist/index.css';

import {TextField, Grid, Button} from '@mui/material';

import './App.css';

function App() {
  const [ fullCircle, setFullCircle ] = useState(0)
  const [ quartercircle, setQuarterCircle ] = useState(90)
  const [ invertedQuarterCircle, setInvertedQuarterCircle ] = useState(0)

  const handleChangeFullCircle = (event) => {
    setFullCircle(event)
  }

  const handleChangeFullCircleText = (event) => {
    setFullCircle(Number(event.target.value))
  }

  const handleChangeQuarterCircle = (event) => {
    setQuarterCircle(event)
  }

  const handleChangeQuarterCircleText = (event) => {
    setQuarterCircle(Number(event.target.value))
  }

  useEffect(() => {
    setInvertedQuarterCircle(90 - quartercircle)
  }, [quartercircle])  
  
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <h3>Full Circle</h3>
          <AngleRange
            radius={150}
            value={fullCircle}
            onChange={handleChangeFullCircle}
            handlerRadius={10}
            handlerRangeRadiusOffset={10}
            min={1}
            max={360}
          />
          <TextField type={'number'} value={fullCircle} onChange={handleChangeFullCircleText}></TextField>
        </div>

        <div>
          <h3>Quarter Circle</h3>
          <AngleRange
            radius={300}
            value={quartercircle}
            onChange={handleChangeQuarterCircle}
            handlerRadius={10}
            handlerRangeRadiusOffset={10}
            min={0}
            max={90}
            isQuarterCircle
          />
          <TextField type={'number'} value={invertedQuarterCircle} onChange={handleChangeQuarterCircleText}></TextField>
        </div>
      </div>
    </div>
  );
}

export default App;

