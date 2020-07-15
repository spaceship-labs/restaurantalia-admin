import { combineReducers } from 'redux';
import auth from './auth';
import menus from './restaurants';
import categories from './categories';
import dishes from './dishes';
import menu from './menu';

const reducer = combineReducers({
  auth,
  menus,
  menu,
  categories,
  dishes,
});

export default reducer;
