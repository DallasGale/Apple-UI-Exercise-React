import React from 'react';
import './styles.scss';
// import PropTypes from 'prop-types';

const Digits = props => {
    const { type } = props;
    return (
        <>
            <div className='c-digits'>
                { type }
            </div>
        </>
    );
};

// Digits.propTypes = {
//     type: PropTypes.string
// };

export default Digits;