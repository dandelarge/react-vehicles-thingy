import React, {useState, useEffect} from 'react'

import {makeTypesList, makeBrandOptions, trafficMeisterClient} from '../helpers';
import TypeDropdown from './TypeDropdown';
import BrandDropdown from './BrandDropdown';
import ColorDropdown from './ColorDropdown';
import Spinner from '../designSystem/Spinner';

export default function Form(props) {

    // Setting loading state
    const [loading, setLoading] = useState(false);

    //Model
    const [vehiclesList, setVehiclesList] = useState([]);

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
        let errorCount = 0;
        (async function onMount(retries = 3) {
            setLoading(true);
            try {
                const list = await trafficMeisterClient.fetchData();
                setVehiclesList(list);
                setTypesOptions(makeTypesList(list));
                setLoading(false);
            } catch(e) {
                // If the API fails, we try again a few more times
                if (errorCount < retries) {
                    errorCount++;
                    onMount(retries);
                // if it doesn't reply after few tries, we stop the spinner
                } else {
                    setLoading(false);
                    console.error(e);
                }
            }
        })();
    }, []);

    useEffect(() => {
        setSelectedBrand('');
        setSelectedColor('');
    }, [selectedType, vehiclesList]);

    // Callbacks to Handle Change
    function onTypeSelect(e)  {
        setSelectedType(e.target.value);
        setBrandOptions(makeBrandOptions(vehiclesList, e.target.value));
        props.setData(e.target.value);
        props.getImage('/img/car-icon.jpg');
        props.setError(false);
    }

    function onBrandSelect(e) {
        const obj = vehiclesList.filter(vehicle => vehicle.brand === e.target.value)[0];
        setSelectedBrand(e.target.value);
        setColorOptions(obj.colors.map(color => ({label: color, value: color})));
        props.setData(selectedType, e.target.value);
        props.getImage(obj.img);
        props.setError(false);
    }

    function onColorSelect(e) {
        setSelectedColor(e.target.value);
        props.setData(selectedType, selectedBrand, e.target.value);
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
