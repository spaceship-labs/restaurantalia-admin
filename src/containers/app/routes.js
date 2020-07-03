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
// import HomeContainer from '../home';
import LoginContainer from '../login';
import MenusContainer from '../menus';
import CategoriesContainer from '../categories';
import DishesContainer from '../dishes';
import FormCategoryContainer from '../categories/create';
import FormDishContainer from '../dishes/create';
import FormMenuContainer from '../menus/edit';

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
        <Route exact path="/" component={MenusContainer} />
        <Route exact path="/menus" component={MenusContainer} />
        <Route exact path="/categorias" component={CategoriesContainer} />
        <Route exact path="/platillos" component={DishesContainer} />
        <Route
          exact
          path="/categorias/crear"
          render={
          () => <FormCategoryContainer type="create" />
        }
        />
        <Route
          exact
          path="/platillos/crear"
          render={
            () => <FormDishContainer type="create" />
          }
        />
        <Route
          path="/menus/editar/:id"
          render={
            () => <FormMenuContainer type="edit" />
          }
        />
        <Route
          path="/categorias/editar/:id"
          render={
            () => <FormCategoryContainer type="edit" />
          }
        />
        <Route
          path="/platillos/editar/:id"
          render={
            () => <FormDishContainer type="edit" />
          }
        />
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
