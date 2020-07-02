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
import CategoriesContainer from '../categories';
import CategoriesCreateContainer from '../categories/create';
import DishesContainer from '../dishes';
import DishesCreateContainer from '../dishes/create';
import MenusContainer from '../menus';
import LoginContainer from '../login';
// import FormCategoryContainer from '../categories/create';
// import FormDishContainer from '../dishes/create';

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
        <Route exact path="/categorias/create" component={CategoriesCreateContainer} />
        <Route exact path="/categorias/:id" component={CategoriesCreateContainer} />
        <Route exact path="/categorias" component={CategoriesContainer} />
        <Route exact path="/platillos/crear" component={DishesCreateContainer} />
        <Route exact path="/platillos/:id" component={DishesCreateContainer} />
        <Route exact path="/platillos" component={DishesContainer} />
        <Route exact path="/menus" component={MenusContainer} />
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
