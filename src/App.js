import React, {Component} from 'react';
import Table from './components/table';

class App extends Component {
  state = {
    picArray: [],
  };

  componentDidMount() {
    fetch('test.json').then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      this.setState({picArray: json});
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
