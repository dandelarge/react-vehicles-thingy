import React from 'react'
import Dropdown from '../designSystem/Dropdown';

export default function ColorDropdown({optionsList, value, onChange}) {
    const typesDropdown = {
        fieldName: 'color',
        fieldId: 'color',
        label: 'Color',
        optionsList: [{label: 'pick a color', value: '', disabled: true}, ...optionsList],
        value,
        onChange
    };

    return (
        <Dropdown {...typesDropdown} />
    )
}
