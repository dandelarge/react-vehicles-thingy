import React, { useState } from 'react';
import './App.scss';

import Form from './Form/Form';

function App() {

  const [image, setImage] = useState('');

  const getImageFromForm = function(img) {
    setImage(img);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Traffic Meister</h1>
      </header>
      <section className="App-form">
        <Form title="Select your Vehicle!" getImage={getImageFromForm} />
      </section>
      <section className="App-detail">
        <img src={image} alt=""/>
      </section>
    </div>
  );
}

export default App;
