import React, { Fragment} from 'react';

export default function Detail({img, data, setError}) {

    function setDefaultImg(e) {
        e.target.src = '/img/404.png';
        setError(true);
    }

    return (
        <Fragment>
            <img src={img} alt="car" onError={setDefaultImg}/>
            {data.color} {data.type}: {data.brand}
        </Fragment>
    );
}