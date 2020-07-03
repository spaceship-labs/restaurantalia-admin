import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  // makeStyles,
} from '@material-ui/core/';
import { Alert } from '@material-ui/lab/';

import { GridContainer, GridImage, PaperDiv } from './index.styled';
import CopyrightComponent from '../../components/copyright';

import selectors from './selectors';
import dispatcher from './dispatcher';

class LoginContainerUnconnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { doLogin } = this.props;
    const { identifier, password } = this.state;
    doLogin({ identifier, password });
  }

  render() {
    const { identifier, password } = this.state;
    const { loginError } = this.props;
    return (
      <GridContainer container component="main">
        <CssBaseline />
        <GridImage item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <PaperDiv>
            <Typography component="h1" variant="h5">
              Restaurantalia
            </Typography>
            <form onSubmit={this.onFormSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username / Email"
                name="identifier"
                autoComplete="email"
                autoFocus
                value={identifier}
                onChange={this.onInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.onInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Iniciar sesion
              </Button>
              <br />
              <br />
              {loginError && <Alert severity="error">Error, revisa tus datos </Alert>}
              <Box mt={5}>
                <CopyrightComponent />
              </Box>
            </form>
          </PaperDiv>
        </Grid>
      </GridContainer>
    );
  }
}

LoginContainerUnconnect.propTypes = {
  doLogin: PropTypes.func.isRequired,
  loginError: PropTypes.string,
};

LoginContainerUnconnect.defaultProps = {
  loginError: '',
};

export { LoginContainerUnconnect };

const LoginContainer = connect(selectors.propsSelector, dispatcher)(LoginContainerUnconnect);

export default LoginContainer;
