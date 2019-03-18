import React, { Component } from "react";
import WorldClock from './containers/worldClock.container';
import "./App.scss";


class App extends Component {


  render() {
    return (
      <>
        {/* <div> */}
          <WorldClock />
        {/* </div> */}
        {/* <div style={{ padding: '20px', textAlign: 'center' }}> 
          <code>
            <span style={{color: 'orangered'}}>TODO</span>
            <ul>
              <li>Add analog clock version with hands</li>
              <li>For each city selected, use the country flag as the background to AM/PM</li>
            </ul>
          </code>
        </div> */}
      </>
    );
  }
}

export default App;