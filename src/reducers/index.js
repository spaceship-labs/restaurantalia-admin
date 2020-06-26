import { combineReducers } from 'redux';
import auth from './auth';
import menus from './restaurants';
import categories from './categories';

const reducer = combineReducers({
  auth,
  menus,
  categories,
});

export default reducer;
