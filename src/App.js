import React from 'react';
import FaceAr from './facear/FaceAr'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FaceAr width={640} height={450} />
      </header>
    </div>
  );
}

export default App;
