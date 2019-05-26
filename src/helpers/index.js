import { fetchData } from './trafficMeisterClient';

export function makeTypesList(list) {
    let types = {};
    const typesArr = list
        .map(item => ({label: item.type, value: item.type}))
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
        .map(vehicle => ({label: vehicle.brand, value: vehicle.brand}));
};

export const trafficMeisterClient = {
    fetchData
};