import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {getAllMedia} from './util/MediaAPI';
import Front from './views/Front';
import Single from './views/Single';
import Nav from './components/Nav';
import Profile from './views/Profile';

class App extends Component {

  state = {
    picArray: [],
  };

  componentDidMount() {
    getAllMedia().then((pics) => {
      console.log(pics);
      this.setState({picArray: pics});
    });
  }

  render() {
    return (
        <Router>
          <div className='container'>
            <Nav/>
            <Route exact path="/" render={(props) => (
                <Front {...props} picArray={this.state.picArray}/>
            )}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/single/:id" component={Single}/>
          </div>
        </Router>
    );
  }
}

export default App;
