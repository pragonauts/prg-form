/**
 * @author David Menger
 */

import React, { PropTypes } from 'react';

function Control ({ className, children }) {
    let controlClass = 'control';
    if (className) {
        controlClass += ` ${className}`;
    }
    return (<p className={controlClass}>
        {children}
    </p>);
}

Control.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any])
};

Control.defaultProps = {
    className: null,
    children: null
};

export default Control;
