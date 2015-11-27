require('normalize.css');
require('styles/App.scss');

import React from 'react';

import Home from './Home';
import TopBar from './TopBar';

class App extends React.Component {
  render() {
    return (
      <div className="app-wraper">
        <div className="page-container">
          <div className="pure-g">
            <div className="pure-u-1">
              <TopBar />
            </div>
            <div className="pure-u-1">
              {this.props.children || <Home />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
