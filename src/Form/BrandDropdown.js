import React from 'react'
import Dropdown from '../designSystem/Dropdown';

export default function BrandDropdown({optionsList, value, onChange}) {
    const typesDropdown = {
        fieldName: 'brand',
        fieldId: 'brand',
        label: 'Brand',
        optionsList: [{label: 'pick a brand', value: '', disabled: true}, ...optionsList],
        value,
        onChange
    };

    return (
        <Dropdown {...typesDropdown} />
    )
}
