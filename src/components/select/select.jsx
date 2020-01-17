import React from 'react';
import './select.less';

export const Select = ({ title, options, value, onChange, className, placeholder }) => {
    return (
        <div className={className}>
            <label>{title}</label>
            <select className="drop-select"
                value={value}
                onChange={onChange}>
                <option disabled={true} value="">{placeholder}</option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
