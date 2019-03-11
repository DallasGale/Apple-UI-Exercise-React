import React, { Component } from 'react';
import Nav from '../components/nav/nav.component';
const API = 'https://raw.githubusercontent.com/dgale1983/Apple-UI-Exercise-React/master/src/_navigation.json';

class Navigation extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      activeIndex: 1,
      activeClick: false,
      firstLinkActive: true,
      linePosition: 0,
      lineWidth: 0,
      navigation: [],
      transitionFx: null
    }
    this.toggleActiveClass= this.toggleActiveClass.bind(this);
  }
    
  // Use this callback ref to get and set first ACTIVE item width & position
  refCallBack = (el) => {
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

      this.setState({
        activeIndex: index,
        activeClick: !this.state.activeClick,
        firstLinkActive: false,
        linePosition: rect.left,
        lineWidth: rect.width,
        transitionFx: true,
      });
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
    
  componentDidMount() {
    window.addEventListener('resize', this.responsiveUpdate);
    this._getData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.responsiveUpdate);
  }
      
  // -------------------Fetch Navigation Data-------------------
  _getData = () => {
    fetch(API)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        else {
          console.error(`There was an issue resolving the API. Status Text: ${res.statusText}`);
        }
      })
      .then(data => {
        let navigation = data.cities.map(city => city);
        this.setState({
          navigation: navigation
        })
    });  
  }

  render() {
    let iterator = 1;
    let cities = this.state.navigation;

    return (
      <div className="content">
        <Nav>
          <ul id="nav-list" className="nav-list">
          {
            cities.slice(0,1).map(c => {
              return (
                <li key={c.section } className="nav-list__items">
                    <a 
                      onClick={this.toggleActiveClass.bind(this, iterator)}
                      ref={this.refCallBack} 
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
      </div>
    );
  }
}

export default Navigation;