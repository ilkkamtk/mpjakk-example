import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {
  Home,
  AccountBox,
  ExitToApp,
  AddCircle,
  Folder,
} from '@material-ui/icons';
import {StateContext} from '../contexts/StateContext';

const Nav = () => {
  return (
      <StateContext.Consumer>
        {context => (
            <nav>
              <List>
                <ListItem button component={Link} to="/home">
                  <ListItemIcon>
                    <Home/>
                  </ListItemIcon>
                  <ListItemText primary="Home"/>
                </ListItem>
                {context.checkLogin() &&
                <React.Fragment>
                  <ListItem button component={Link} to="/my-files">
                    <ListItemIcon>
                      <Folder/>
                    </ListItemIcon>
                    <ListItemText primary="My Files"/>
                  </ListItem>
                  <ListItem button component={Link} to="/upload" onClick={() => {
                    context.resetFile();
                  }}>
                    <ListItemIcon>
                      <AddCircle/>
                    </ListItemIcon>
                    <ListItemText primary="Upload"/>
                  </ListItem>
                  <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                      <AccountBox/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                  </ListItem>
                  <ListItem button component={Link} to="/logout">
                    <ListItemIcon>
                      <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                  </ListItem>
                </React.Fragment>
                }
                {!context.checkLogin() &&
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <ExitToApp/>
                  </ListItemIcon>
                  <ListItemText primary="Login"/>
                </ListItem>
                }

              </List>
            </nav>
        )}
      </StateContext.Consumer>
  );
};

export default Nav;