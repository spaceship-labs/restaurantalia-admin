import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import { rootSaga } from '../sagas/index';

const initialState = {
  auth: {
    userId: 0,
    user: {},
    jwt: '',
    loginError: '',
  },
  menus: {
    menusList: {},
    menuSingle: {},
  },
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
