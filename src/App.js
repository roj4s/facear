import React from 'react';
import FaceAr from './facear/FaceAr'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FaceAr width={300} height={200} />
      </header>
    </div>
  );
}

export default App;
