import React from 'react';
import PropTypes from 'prop-types';

export default function Dropdown(props) {

    const dropdownOptions = props.optionsList.map(option => (
        <option value={option.value} key={option.value} disabled={option.disabled} >{option.label}</option>
    ));

    return (
        <div className="fieldset">
            <select
                name={props.fieldName}
                id={props.fieldId}
                className="App-dropdown"
                disabled={props.disabled}
                onChange={props.onChange}
                value={props.value}
                data-testid={`${props.fieldId}-select`}>
                {dropdownOptions}
            </select>
            <label htmlFor="">{props.label}</label>
          </div>
    );
}

Dropdown.propTypes = {
    fieldName: PropTypes.string,
    fieldId: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    optionsList: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
}