import React from 'react';
import { Link } from 'react-router';

import BackendConnection from '../connections/BackendConnection';

class TopBarSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: []
    };
  }

  render() {
    return (
      <div className='search-input'>
        <form className='pure-form' onSubmit={this.preventSubmit}>
          <input type='text' placeholder='Szukaj...' onChange={this.queryUpdated.bind(this)} />

          <div className='search-results'>
            <ul>
              {this.state.searchResults.map((result) => {
                  return (
                    <li key={result.id}>
                      <Link to={'/przedszkole/' + result.id}>{result.name}</Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </form>
      </div>
    );
  }

  preventSubmit(event) {
    event.preventDefault();
  }

  queryUpdated(event) {
    const value = event.target.value;
    if (this.state.oldQuery !== value && value.length >= 4) {
      BackendConnection.searchKindergartens(value, (response) => {
        this.setState({searchResults: response});
      });
    } else {
      this.setState({searchResults: []});
    }
    this.setState({searchQuery: value});

  }
}

export default TopBarSearchInput;
