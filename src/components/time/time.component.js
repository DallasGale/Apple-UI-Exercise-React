import React from 'react';
import AmPm from '../ampm/ampm.component';
import Digits from '../digits/digits.component';
import PropTypes from 'prop-types';

const Time = props => {

    const { amPm, minutes, seconds } = props;

    return (
        <>
            <div style={{width: '25%'}}>
                <Digits type={ minutes } />
            </div>

            <div style={{width: '25%'}}>
                <Digits type={ seconds } />
            </div>


            <div style={{width: '25%'}}>
                <AmPm amPm={ amPm } />
            </div>
        </>
    );
};

Time.propTypes = {
    amPm: PropTypes.string,
    minutes: PropTypes.number,
    // seconds: PropTypes.string
};

export default Time;