import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const AmPm = props => {
    const { amPm } = props;
    return (
        <>
            <div className='c-amPm'>
                { amPm }
            </div>
        </>
    );
};

AmPm.propTypes = {
    amPm: PropTypes.string
};

export default AmPm;