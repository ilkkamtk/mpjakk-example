import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Front from './views/Front';
import Single from './views/Single';
import Nav from './components/Nav';
import Login from './views/Login';
import Profile from './views/Profile';
import Logout from './views/Logout';
import Grid from '@material-ui/core/Grid';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Modify from './views/Modify';
import {StateProvider} from './contexts/StateContext';

class App extends Component {

  render() {
    return (
        <StateProvider>
          <Router basename='/~ilkkamtk/mpjakk-react'>
            <Grid container>
              <Grid item sm={2}>
                <Nav/>
              </Grid>
              <Grid item sm={10}>
                <Route path="/home" component={Front}/>

                <Route path="/upload" component={Upload}/>

                <Route path="/single/:id" component={Single}/>

                <Route path="/modify/:id" component={Modify}/>

                <Route path="/profile" component={Profile}/>

                <Route path="/my-files" component={MyFiles}/>

                <Route exact path="/" component={Login}/>

                <Route path="/logout" component={Logout}/>
              </Grid>
            </Grid>
          </Router>
        </StateProvider>
    );
  }
}

export default App;
