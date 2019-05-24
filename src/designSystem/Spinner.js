import React from 'react';
import './Spinner.scss';

export default function Spinner() {
    return (
        <div className="overlay">
            <div className="lds-circle"><div></div></div>
            <p>loading...</p>
        </div>
    );
}
