import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import Ranks from './Ranks';

render((
  <Router history={createHistory()}>
    <Route path="/" component={App} >
      <Route path="ranks" component={Ranks} />
    </Route>
  </Router>
), document.getElementById('app'))
