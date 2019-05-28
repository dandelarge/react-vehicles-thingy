import React, {useState, useEffect} from 'react'

import {
    makeFullOptions,
    makeBrandOptions,
    makeColorOptions,
    trafficMeisterClient,
    filterOptionsWithCriteria,
    setDisabledOptions } from '../helpers';
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
                // All is Cool; let's fill up the first Dropdown
                const list = await trafficMeisterClient.fetchData();
                setVehiclesList(list);
                setTypesOptions(makeFullOptions(list, 'type'));
                setBrandOptions(makeFullOptions(list, 'brand'));
                setColorOptions(makeColorOptions(list));
                // setTypesOptions(makeTypesOptions(list));
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

    function changeBasedOnType(e) {
        setBrandOptions(makeBrandOptions(vehiclesList, e.target.value));
    }

    function disableBasedOnType(e) {
        const {brands, colors } = filterOptionsWithCriteria(vehiclesList, 'type', e.target.value);
        setBrandOptions(setDisabledOptions(brandOptions, brands));
        setColorOptions(setDisabledOptions(colorOptions, colors));
    }

    function changeBasedOnBrand(e, obj) {
        setColorOptions(obj.colors.map(color => ({label: color, value: color})));
    }

    function disableBasedOnBrand(e) {
        const {types, colors } = filterOptionsWithCriteria(vehiclesList, 'brand', e.target.value);
        setTypesOptions(setDisabledOptions(typesOptions, types));
        setColorOptions(setDisabledOptions(colorOptions, colors));
    }

    function disableBasedOnColor(e) {
        const { brands, types } = filterOptionsWithCriteria(vehiclesList, 'colors', e.target.value);
        setBrandOptions(setDisabledOptions(brandOptions, brands));
        setTypesOptions(setDisabledOptions(typesOptions, types));
    }

    function resetFields() {
        setSelectedType('');
        setSelectedBrand('');
        setSelectedColor('');
        setTypesOptions(makeFullOptions(vehiclesList, 'type'));
        setBrandOptions(makeFullOptions(vehiclesList, 'brand'));
        setColorOptions(makeColorOptions(vehiclesList));
    }

    // Callbacks to Handle Change
    function onTypeSelect(e) {
        setSelectedType(e.target.value);
        functionSwitch ? changeBasedOnType(e) : disableBasedOnType(e);
    }

    function onBrandSelect(e) {
        setSelectedBrand(e.target.value);
        const obj = vehiclesList.filter(vehicle => vehicle.brand === e.target.value)[0];
        props.setData(selectedType, e.target.value);
        props.getImage(obj.img);
        props.setError(false);
        functionSwitch ? changeBasedOnBrand(e, obj) : disableBasedOnBrand(e);
    }

    function onColorSelect(e) {
        setSelectedColor(e.target.value);
        props.setData(selectedType, selectedBrand, e.target.value);
        disableBasedOnColor(e);
    }

    const [functionSwitch, setFunctionSwitch] = useState(false);
    function switchFunctionality() {
        setFunctionSwitch(!functionSwitch);
        resetFields();
    }

    return (
        <form>
          <h3>{props.title}</h3>
          <div>
            <input type="checkbox" value={functionSwitch} onChange={switchFunctionality} /> {'<- this is a feature switch. Click it and test'}
          </div>
          <TypeDropdown optionsList={typesOptions} value={selectedType} onChange={onTypeSelect}/>
          <BrandDropdown optionsList={brandOptions} value={selectedBrand} onChange={onBrandSelect}/>
          <ColorDropdown optionsList={colorOptions} value={selectedColor} onChange={onColorSelect} />
          <button className="reset-button" onclick={resetFields}>reset</button>
          {!loading || <Spinner />}
        </form>
    )
}
