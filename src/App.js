import React, {Component} from 'react';
import Table from './components/table';

class App extends Component {

  apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';

  state = {
    picArray: [],
  };

  componentDidMount() {
    fetch(this.apiUrl).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      return Promise.all(json.map(pic => {
        return fetch(this.apiUrl + pic.file_id).then(response => {
          return response.json();
        });
      })).then(pics => {
        console.log(pics);
        this.setState({picArray: pics});
      });
    });
  }

  render() {
    return (
        <div className="container">
          <Table picArray={this.state.picArray}/>
        </div>
    );
  }
}

export default App;
