import React, { useEffect, useState, useRef } from 'react';
import FaceAr from './facear/FaceAr'

import './App.css';

function App() {

  const rootRef = useRef()
  const [size, setSize] = useState({width: 200, height: 300})

  useEffect(() => {

    console.log(`Offset width ${rootRef.offsetWidth}`)
    if(window.screen.width <= 600){
      setSize({
        width: window.screen.width,
        height: window.screen.height
      })
    }

  },[])


  return (
    <div className="App">
      <header className="App-header">
        <FaceAr width={size.width} height={size.height} />
      </header>
    </div>
  );
}

export default App;
