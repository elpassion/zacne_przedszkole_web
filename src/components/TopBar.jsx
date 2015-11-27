import React from 'react';

import TopBarSearchInput from './TopBarSearchInput';
import { Link } from 'react-router'

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
                <Link to="/ranking" className="pure-menu-link">
                  Ranking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
