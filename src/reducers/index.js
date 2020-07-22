import { combineReducers } from 'redux';
import auth from './auth';
import restaurants from './restaurants';
import categories from './categories';
import dishes from './dishes';
import menu from './menu';

const reducer = combineReducers({
  auth,
  menu,
  categories,
  dishes,
  restaurants,
});

export default reducer;
