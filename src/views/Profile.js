import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {StateContext} from '../contexts/StateContext';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 300,
    objectFit: 'cover',
  },
};

const Profile = (props) => {
  const {classes} = props;
  return (
      <StateContext.Consumer>
        {context => (
            <React.Fragment>
              {console.log(context.user)}
              {(!context.checkLogin() &&
                  <Redirect to="/"/>)
              ||
              <React.Fragment>
                <h1>Profile</h1>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                               image={context.uploadsUrl +
                               context.user.profilePic.filename}
                               title={context.user.username}/>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {context.user.username}
                      </Typography>
                      <Typography component="p">
                        email: {context.user.email}
                      </Typography>
                      <Typography component="p">
                        Full name: {context.user.full_name}
                      </Typography>
                      <Button component={Link} to="/my-files">
                        My Files
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </React.Fragment>
              }
            </React.Fragment>
        )}
      </StateContext.Consumer>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);