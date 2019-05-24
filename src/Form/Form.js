import React, {useState, useEffect} from 'react'

import trafficMeister from '../service';
import {makeTypesList, makeBrandOptions} from '../helpers';
import TypeDropdown from './TypeDropdown';
import BrandDropdown from './BrandDropdown';
import ColorDropdown from './ColorDropdown';
import Spinner from '../designSystem/Spinner';

export default function Form(props) {

    // Setting loading state
    const [loading, setLoading] = useState(false);

    //Model
    const [vehiclesList, setVehicleslist] = useState([]);

    //Select values
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    //Options for the selects
    const [typesOptions, setTypesOptions] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);

    // Handling initial rendering
    useEffect(() => {
        setLoading(true);
        //TODO: Make this a promise if I have time
        trafficMeister.fetchData((error, data) => {
            if(error) {
                console.log('trafficMeister API failed');
                data = [];
            }
            setVehicleslist(data);
            setTypesOptions(makeTypesList(data));
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setSelectedBrand('');
        setSelectedColor('');
    }, [selectedType, vehiclesList]);

    // Callbacks to Handle Change
    function onTypeSelect(e)  {
        setSelectedType(e.target.value);
        setBrandOptions(makeBrandOptions(vehiclesList, e.target.value));
    }

    function onBrandSelect(e) {
        const obj = vehiclesList.filter(vehicle => vehicle.brand === e.target.value)[0];
        setSelectedBrand(e.target.value);
        setColorOptions(obj.colors.map(color => ({label: color, value: color})));
        props.getImage(obj.img);
    }

    function onColorSelect(e) {
        setSelectedColor(e.target.value);
    }

    return (
        <form>
          <h3>{props.title}</h3>
          <TypeDropdown optionsList={typesOptions} value={selectedType} onChange={onTypeSelect}/>
          <BrandDropdown optionsList={brandOptions} value={selectedBrand} onChange={onBrandSelect}/>
          <ColorDropdown optionsList={colorOptions} value={selectedColor} onChange={onColorSelect} />
          {!loading || <Spinner />}
        </form>
    )
}
