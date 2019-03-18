import React, { Component } from 'react';
// import PropTypes from 'prop-types';


const timeZones = {
    eastern: -4, // ny
    pacific: -8, // cupertino
    gmt: 0, // london
    cet: +1, //amsterdam
    jst: +9, // tokyo
    hkt: +8, // hong kong
    aest: +11 // sydney
  };



class TimeZones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCity: "Cupertino",
            timeOnLoad: this.getUctTime(),
            refreshTime: this.refreshTime(),
            selectedCityTimeZone: '',
            timezones: [
            {
                cupertino: timeZones.pacific,
                newYork: timeZones.eastern,
                london: timeZones.gmt,
                amsterdam: timeZones.cet,
                tokyo: timeZones.jst,
                hongKong: timeZones.hkt,
                sydney: timeZones.aest
            }
            ]
        };
    }

    // Get Current City time zone 
    getSelectedCityTimeZone = (city) => {
        let hour = this.getUctTime().h;
        switch (city) {
            case "Cupertino":
                hour = -timeZones.pacific;
                break;
        
            case "New York City":
                hour = -timeZones.eastern;
                break;
        
            case "London":
                hour = -timeZones.gmt;
                break;
        
            case "Amsterdam":
                hour = -timeZones.cet;
                break;
        
            case "Tokyo":
                hour = -timeZones.jst;
                break;
        
            case "Hong Kong":
                hour = -timeZones.hkt;
                break;
        
            case "Sydney":
                hour = -timeZones.aest;
                break;
        
            default:
                return hour;
        }
        console.log('getSelectedCityTimeZone() ', city + hour);
    }


    // Method to return timezone of current 
    getUctTime = () => {
        let d = new Date();
        let h = d.getUTCHours();
        let m = d.getUTCMinutes();
        let s = d.getUTCSeconds();
        let amPm = ""; 
    
        // Add leading 0's to all single digits i.e 9:00:2 AM becomes 09:00:02 AM
        if (h >= 0 && h < 10) h = `0${d.getUTCHours()}`; else h = d.getUTCHours();
        if (m >= 0 && m < 10) m = `0${d.getUTCMinutes()}`; else m = d.getUTCMinutes();
        if (s >= 0 && s < 10) s = `0${d.getUTCSeconds()}`; else s = d.getUTCSeconds();

        // Assign AM or PM to 24hr time
        if (h > 12 && h < 24) amPm = "PM"; else amPm = "AM";
  
        let time = `${h}:${m}:${s} ${amPm}`;
        return time;
  };
  
  componentDidUpdate() {
    this.refreshTime();
  }

  refreshTime = () => {
    const refreshRate = 1000;
    setTimeout(() => {
      this.setState({
        timeOnLoad: this.getUctTime()
      });
    }, refreshRate);
  };



  render() {
    return (
        <div>
            Current time in { this.state.selectedCity } is { this.state.selectedCityTimeZone };
        </div>
    )
  }
}

// TimeZones.propTypes = {

// };

export default TimeZones;
