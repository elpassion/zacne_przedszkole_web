import React from 'react';

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
      <form className='pure-form' onSubmit={this.preventSubmit}>
        <input className='pure-input-1 search-input' type='text' placeholder='Szukaj...' onChange={this.searchUpdated.bind(this)} />
      </form>
    );
  }

  preventSubmit(event) {
    event.preventDefault();
  }

  searchUpdated(event) {
    const value = event.target.value;
    this.setState();
  }
}

export default TopBarSearchInput;
