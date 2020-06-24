import { combineReducers } from 'redux';
import auth from './auth';
import menus from './menu';

const reducer = combineReducers({
  auth,
  menus,
});

export default reducer;
