import React from 'react';
import {Link} from 'react-router'

import TopBarSearchInput from './TopBarSearchInput';

class TopBar extends React.Component {
  render() {
    return (
      <div className='topbar'>
        <div className='l-box'>
          <div className='pure-menu pure-menu-horizontal'>
            <Link to='/' className='pure-menu-heading pure-menu-link'>Zacne Przedszkole</Link>
            <ul className='pure-menu-list'>
              <li className='pure-menu-item menu-input'>
                <TopBarSearchInput />
              </li>
            </ul>
            <ul className='pull-right pure-menu-list'>
              <li className='pure-menu-item'>
                <a href='#' className='pure-menu-link'>Ranking</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
