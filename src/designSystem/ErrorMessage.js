import React from 'react';
import './ErrorMessage.scss';

export default function ErrorMessage({text}) {

    return(
        <div className="error">
            <h3>{text}</h3>
        </div>
    );
}