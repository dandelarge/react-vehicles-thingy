import { fetchData } from './trafficMeisterClient';

// Just using this as a facade to hide complexity from the components
// Keeping it readable in the component file, and allowing us to be a
// little "messy" with this API

export function makeTypesOptions(list) {
    let types = {};
    const typesArr = list
        .map(item => ({label: item.type, value: item.type, id: item.id}))
        .filter((val, index) => {
            if(val.value in types) {
                return false;
            }
            types[val.value] = index;
            return true;
        });
    return typesArr;
};

export function makeBrandOptions(list, type) {
    return list
        .filter(vehicle => vehicle.type === type)
        .map(vehicle => ({label: vehicle.brand, value: vehicle.brand, id: vehicle.id}));
};

export function makeFullOptions(list, attr) {
    const auxObj = {};
    return list.map(item => {
        if(item[attr] in auxObj) {
            return null;
        }
        auxObj[item[attr]] = item.id;
        return {label: item[attr], value:item[attr], id: item.id}
    }).filter(item => item !== null);
}

export function makeColorOptions(list) {
    const colorsObj = {};
    let colorArray = [];
    list.forEach(item => {
        item.colors.forEach(color => {
            if(color in colorsObj) {
                return;
            }
            colorsObj[color] = item.id;
            colorArray.push({label: color, value: color, id: `${item.id}-${color}`});
        });
    });
    return colorArray;
}

export function makeOptionsFromArrayOfStrings(array) {
    return array.map(option => ({label: option, value:option, id: option}));
}

export function filterOptionsWithCriteria(list, criteria = 'type', value = 'car') {
    let types = {},
        brands ={},
        colors = {};
    list.filter(item => {
            if(Array.isArray(item[criteria])) {
                return item[criteria].indexOf(value) !== -1;
            }
            return item[criteria] === value;
        })
        .forEach(item => {
            if(!(item.type in types)) types[item.type] = item.id;
            if(!(item.brand in brands)) brands[item.brand] = item.id;
            item.colors.forEach(color => {
                if(!(color in colors)) colors[color] = item.id
            });
        });
    return {
        types,
        brands,
        colors
    };
}

export function setDisabledOptions(optsArray, setObject) {
    const newOptionsArray = optsArray.map(option => {
        if(!(option.value in setObject)) {
            return {disabled: true, ...option}
        }
        return option;
    });
    return newOptionsArray;
}


// So far I got only fetchData, but maybe in the future this could grow
// to maybe storing or updating data, We can probably expect the API to
// work in a callback based mannerm, so this wrapper will be the 'focal point'
// to all this logic expoesed to the App as a Promise
export const trafficMeisterClient = {
    fetchData
};