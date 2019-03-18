import React from 'react';
import './styles.scss';
import AmPm from '../ampm/ampm.component';
import Hour from '../hour/hour.component';
import Digits from '../digits/digits.component';
import PropTypes from 'prop-types';

const CurrentTime = props => {

    const { 
        amPm,
        city, 
        minutes, 
        seconds, 
        hours } = props;

    return (
        <div className='c-currentTime'>
            Current time in 
            <div className='c-currentTime__city'>
                { city }
            </div>

            <div className='c-currentTime__time'>
                <div className='c-currentTime__digits'>
                    <Hour hours={ hours } />
                </div>

                <div className='c-currentTime__digits'>
                    <Digits type={ minutes } />
                </div>

                <div className='c-currentTime__digits'>
                    <Digits type={ seconds } />
                </div>

                <div className='c-currentTime__digits'>
                    <AmPm amPm={ amPm } />
                </div>
            </div>
        </div>
    );
};

CurrentTime.propTypes = {
    city: PropTypes.string
};

export default CurrentTime;