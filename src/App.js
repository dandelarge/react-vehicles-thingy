import React, { useState } from 'react';
import './App.scss';

import Form from './Form/Form';
import Detail from './Detail/Detail';
import ErrorMessage from './designSystem/ErrorMessage';

function App() {

  const [image, setImage] = useState('/img/car-icon.jpg');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);

  const getImageFromForm = function(img) {
    setImage(img);
  };

  const setData = function(type = '', brand = '', color = '') {
    setType(type);
    setBrand(brand);
    setColor(color);
  }

  function setErrorStatus(isError) {
    setError(isError);
  }

  return (
      <div className="App">
        <header className="App-header">
          <h1>Traffic Meister</h1>
        </header>
        <section className="App-form">
          <Form
            title="Select your Vehicle!"
            getImage={getImageFromForm}
            setData={setData}
            setError={setErrorStatus} />
        </section>
        <section className="App-detail">
          <Detail
            img={image}
            data={{type, brand, color}}
            setError={setErrorStatus} />
          {!error || <ErrorMessage text={`oops! Something went wrong... Pick Another vehicle`} />}
        </section>
      </div>
  );
}

export default App;
