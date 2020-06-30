import React, { useEffect } from 'react';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../history';

import selectors from './selectors';
import dispatcher from './dispatcher';

// containers
import HomeContainer from '../home';
import LoginContainer from '../login';

const Routes = ({ isLoggedIn, getUser }) => {
  useEffect(() => {
    getUser();
  });

  if (!isLoggedIn) {
    return <LoginContainer />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
      </Switch>
    </Router>
  );
};

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
};

const { propsSelector } = selectors;

export default connect(propsSelector, dispatcher)(Routes);
