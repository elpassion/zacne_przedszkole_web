import React from 'react';

class RankRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: props.school
    };
  }

  render() {
    return(
      <tr>
        <td>1</td>
        <td>{Math.floor(this.state.school.stars)}/10</td>
        <td>{this.state.school.name}</td>
        <td>{this.state.school.address}, {this.state.school.city}</td>
      </tr>
    );
  }
}

export default RankRow;
