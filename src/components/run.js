import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';

render((
  <Router history={createHistory()}>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('app'))
