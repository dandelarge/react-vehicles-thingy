import React from 'react'
import Dropdown from '../designSystem/Dropdown';

export default function BrandDropdown({optionsList, value, onChange}) {
    const typesDropdown = {
        fieldName: 'brand',
        fieldId: 'brand',
        label: 'Brand',
        optionsList: [{label: 'pick a brand', value: ''}, ...optionsList],
        value,
        onChange
    };

    return (
        <Dropdown {...typesDropdown} />
    )
}
