import { combineReducers } from 'redux';
import auth from './auth';
import menus from './restaurants';
import categories from './categories';
import dishes from './dishes';

const reducer = combineReducers({
  auth,
  menus,
  categories,
  dishes,
});

export default reducer;
