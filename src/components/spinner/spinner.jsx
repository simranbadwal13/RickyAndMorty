import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import './spinner.less';

export const Spinner = () => {
    return (
        <div className="error-container">
            <FontAwesomeIcon icon={faCircleNotch}
                className="error-icon"
                size={'6x'}
                spin
            />
        </div>
    );
}

