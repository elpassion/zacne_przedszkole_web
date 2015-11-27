import React from 'react';
import { Link } from 'react-router'

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
        <td><Link to={'/przedszkole/' + this.state.school.id}>{this.state.school.name}</Link></td>
        <td>{this.state.school.address}, {this.state.school.city}</td>
      </tr>      
    );
  }
}

export default RankRow;
