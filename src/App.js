import React, { useEffect, useState } from 'react';
import FaceAr from './facear/FaceAr'

import './App.css';

function App() {

  const [size, setSize] = useState({width: 640, height: 480})

  useEffect(() => {

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
