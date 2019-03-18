import React, { Component } from 'react';
import Nav from '../components/nav/nav.component';
import CurrentTime from '../components/currentTime/currentTime.component';

const API = 'https://raw.githubusercontent.com/dgale1983/Apple-UI-Exercise-React/master/src/_navigation.json';

class WorldClock extends Component {
  
  constructor(props) { 

  //-----------------------------------------------------//
  // State variables 
  //-----------------------------------------------------//
  const date = new Date();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();
  let amPm = '';

  //-----------------------------------------------------//
  // Functions
  //-----------------------------------------------------//
  addLeadingZeros(hours);
  addLeadingZeros(minutes);
  addLeadingZeros(seconds);

    super(props);
    this.state = {
      activeCity: 'Cupertino',
      activeClick: false,
      activeIndex: 1,
      amPm: useAmOrPm(amPm, date.getUTCHours() - 8),
      errorMessage: null,
      errorStatus: null,
      fetchApi: false,
      firstLinkActive: true,
      hours: date.getUTCHours() - 8,
      linePosition: 0,
      lineWidth: 0,
      minutes: new Date().getUTCMinutes(),
      navigation: [],
      refreshTime: this._refreshTime(),
      transitionFx: null,
      seconds:  new Date().getUTCSeconds(),
    }
    this.toggleActiveClass= this.toggleActiveClass.bind(this);
    console.log(this.state.amPm);
  }
    
  // Use this callback ref to get and set first ACTIVE item width & position
  _refCallBack = (el) => {
    if (el) {
      let rect = el.getBoundingClientRect();
      this.setState({
        linePosition: Math.round(rect.left) + 'px',
        lineWidth: Math.round(rect.width) + 'px'
      })
    }
  }
  
  // Handles the active link click event
  toggleActiveClass(index, e) {
    e.preventDefault();
      let active = e.target;
      let rect = active.getBoundingClientRect();
      let amPm = '';

      console.log(this.state.hours);
      
      console.log(this.state.amPm);
      this.setState({
        activeIndex: index,
        activeClick: !this.state.activeClick,
        activeCity: e.target.textContent,
        hours: useAmOrPm(amPm, this.state.hours),
        firstLinkActive: false,
        linePosition: rect.left,
        lineWidth: rect.width,
        transitionFx: true,
      });


      let activeCity = active.textContent; // get the string of the active city: i.e 'New York City'
      this.getSelectedCityTimeZone(activeCity);
  }
    

  // When screen size updates this allows the 'magic-line' to stick to the active item's position and width
  responsiveUpdate = () => {
    let activeLink = document.getElementsByClassName('active');
    for (let i = 0; i < activeLink.length; i++) {

      let responsiveRect = activeLink[i].getBoundingClientRect();

      this.setState({
        linePosition: Math.round(responsiveRect.left),
        lineWidth: Math.round(responsiveRect.width),
        transitionFx: false,
      })
    }
  }
  
  // Get Current City time zone 
  getSelectedCityTimeZone = (city) => {
    let amPm = '';
    let hourUtc = new Date().getUTCHours();
    let hourUpdated = 0;
    let timeZones = { eastern: 4, pacific: 8, gmt: 0, cet: 1, jst: 9, hkt: 8, aest: 11 };


    switch (city) {
      case "Cupertino":
          hourUpdated = hourUtc - timeZones.pacific;
          break;
  
      case "New York City":
          hourUpdated = hourUtc - timeZones.eastern;
          break;
  
      case "London":
          hourUpdated = hourUtc - timeZones.gmt;
          break;
  
      case "Amsterdam":
          hourUpdated = hourUtc + timeZones.cet;
          break;
  
      case "Tokyo":
          hourUpdated = hourUtc + timeZones.jst;
          break;
  
      case "Hong Kong":
          hourUpdated = hourUtc + timeZones.hkt;
          break;
  
      case "Sydney":
          hourUpdated = hourUtc + timeZones.aest;
          break;
  
      default:
          return hourUpdated;
    }

    switch (hourUpdated) {
      case 24:
        hourUpdated = 0
        break;

      case 25:
        hourUpdated = 1
        break;

      case 26:
        hourUpdated = 2
        break;

      case 27:
        hourUpdated = 3
        break;

      case 28:
        hourUpdated = 4
        break;

      case 29:
        hourUpdated = 5
        break;

      case 30:
        hourUpdated = 6
        break;

      case 31:
        hourUpdated = 7
        break;

      case 32:
        hourUpdated = 8
        break;

      case 33:
        hourUpdated = 9
        break;

      default: 
        break;
    }
    
    this.setState({
      amPm: useAmOrPm(amPm, hourUpdated),
      hours: addLeadingZeros(hourUpdated)
    })
    return hourUpdated;
  }

    
  // -------------------Set interval for 1000ms to keep time updated & refreshed-------------------
  _refreshTime = () => {
    let refreshRate = 1000;
    
    this.interval = setInterval(() => {
      let date = new Date();
      let getSeconds = addLeadingZeros(date.getUTCSeconds());
      let getMinutes = addLeadingZeros(date.getUTCMinutes());
      this.setState({
        // amPm: useAmOrPm(amPm, this.hours),
        hours: addLeadingZeros(this.getSelectedCityTimeZone(this.state.activeCity)),
        seconds: getSeconds,
        minutes: getMinutes
      })
    }, refreshRate);
  }
  
  // -------------------Fetch Navigation Data-------------------
  _getData = () => {
    fetch(API)
      .then(res => {
        console.log(res.status);
        if (res.ok) {
          return res.json();
        }
        else {
          return;
        }
      })
      .then(data => {
        let navigation = data.cities.map(city => city);
        this.setState({
          navigation: navigation
        })
    })
    .catch(error => {
      let erroMsg = `There was an issue resolving the API.`;
      let errorStatus = error;
      this.setState({
        fetchApi: true,
        errorMessage: erroMsg,
        errorStatus: errorStatus,
      })
      console.log(erroMsg + errorStatus);
    });  
  }


  //-----------------------------------------------------//
  // Lifecycle methods
  //-----------------------------------------------------//

  componentDidMount() {
    window.addEventListener('resize', this.responsiveUpdate);
    this._getData();
    this._refreshTime();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.responsiveUpdate);
    clearInterval(this.interval)
  }




  render() {
    let iterator = 1;
    let cities = this.state.navigation;

    return (
      <div className="content">

        { !this.state.fetchApi ? (
          <Nav>
            <ul id="nav-list" className="nav-list">
            {
              cities.slice(0,1).map(c => {
                return (
                  <li key={c.section } className="nav-list__items">
                      <a 
                        onClick={this.toggleActiveClass.bind(this, iterator)}
                        ref={this._refCallBack} 
                        id={ c.section } 
                        className={`nav-list__items-link ${this.state.firstLinkActive ? 'active' : ''}`}
                        href={`#${c.section}`}
                        tabIndex={ iterator++ }>
                          { c.label }
                      </a>
                  </li>
                )
              }
              )
            }
            {
              cities.slice(1).map(c => {
                return (
                    <li key={c.section} className="nav-list__items">
                        <a 
                          onClick={this.toggleActiveClass.bind(this, iterator)}
                          id={ c.section } 
                          className={`nav-list__items-link
                            ${this.state.activeIndex === iterator ? 'active' : ''}`
                          } 
                          href={`#${c.section}`}
                          tabIndex={ iterator++ }>
                            { c.label }
                        </a>
                    </li>
                  
                )
              })
            }
              <div id='active-nav-line' 
                className={`active-nav-line ${this.state.transitionFx ? 'setLineTransition' : '' }`} 
                style={{
                  width: this.state.lineWidth,
                  left: this.state.linePosition,
                }}>

              </div>
            </ul>
          </Nav> 
          ) : (
          <div>
            <div className='error'>
                { this.state.errorMessage + this.state.errorStatus }
            </div>
          </div>
          )
        }

        <CurrentTime 
          city={ this.state.activeCity }
          hours={ this.state.hours } 
          amPm={ this.state.amPm }
          minutes={ this.state.minutes }
          seconds={ this.state.seconds } />
      </div>
    );
  }
}

export default WorldClock;



//-----------------------------------------------------//
// Function declarations
//-----------------------------------------------------//

function addLeadingZeros(digitType) {
  if (digitType >= 0 && digitType < 10) return `0${digitType}`;
  else return digitType; 
}


function useAmOrPm(text, hours) {
  if (hours >= 12 && hours <= 23) {
    text = 'PM'
    return text;
  }
  else {
    text = 'AM';
    return text; 
  }
}