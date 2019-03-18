import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const date = new Date();

class Time extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: {
                minutes: date.getUTCMinutes(),
                seconds: date.getUTCSeconds()
            },
        };
    }


  render() {
    return (
        <div className='time'>
            { this.state.selectedCityTimeZone };
        </div>
    )
  }
}

// TimeZones.propTypes = {

// };

export default Time;
