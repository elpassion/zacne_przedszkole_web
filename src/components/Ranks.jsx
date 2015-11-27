import React from 'react';

import BackendConnection from '../connections/BackendConnection';
import RankRow from './RankRow';

class Ranks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: []
    };

    this.getSchools();
  }

  render() {
    const schoolRows = this.state.schools.map((school, index) => {
      return <RankRow school={school} index={index+1} key={school.id} />
    });

    return (
      <div id='home-page' className='page-content'>
        <div id="ranks">
          <div className='pure-g'>
            <div className='pure-u-1'>
              <h3 className='center'>
                TOP 100 PRZEDSZKOLI W WARSZAWIE
              </h3>
            </div>
          </div>
          <table className="pure-table pure-table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>OCENA</th>
                <th>NAZWA</th>
                <th>ADRES</th>
              </tr>
            </thead>
            <tbody>
              {schoolRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  getSchools() {
    BackendConnection.getRanking(0, 100, this.schoolsLoaded.bind(this));
  }

  schoolsLoaded(schools) {
    this.setState({
      schools: schools
    });
  }
}

export default Ranks;
