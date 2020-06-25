import { combineReducers } from 'redux';
import auth from './auth';
import menus from './restaurants';

const reducer = combineReducers({
  auth,
  menus,
});

export default reducer;
