import React from 'react'
import Dropdown from '../designSystem/Dropdown';

export default function TypeDropdown({optionsList, value, onChange}) {
    const typesDropdown = {
        fieldName: 'type',
        fieldId: 'type',
        label: 'Vehicle Type',
        optionsList: [{label: 'pick a type of vehicle', value: '', disabled: true}, ...optionsList],
        value,
        onChange
    };

    return (
        <Dropdown {...typesDropdown} />
    )
}
