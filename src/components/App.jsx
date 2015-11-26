require('normalize.css');
require('styles/App.scss');

import React from 'react';

import Home from './Home';
import TopBar from './TopBar';

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <TopBar />
        {this.props.children || <Home />}
      </div>
    );
  }

  renderPage() {}
}

export default App;
