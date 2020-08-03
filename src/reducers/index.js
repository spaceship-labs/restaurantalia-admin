import { combineReducers } from 'redux';
import auth from './auth';
import restaurants from './restaurants';
import categories from './categories';
import dishes from './dishes';
import menu from './menu';
import app from './app';

const reducer = combineReducers({
  app,
  auth,
  menu,
  categories,
  dishes,
  restaurants,
});

export default reducer;
