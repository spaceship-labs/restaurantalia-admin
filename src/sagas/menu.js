import {
  call, select, put, takeLatest,
} from 'redux-saga/effects';
import { getMenus, getMenu } from '../api';
import menuActions from '../actions/restaurants';

const {
  GET_MENUS,
  GET_MENU,
  SET_MENUS,
} = menuActions.types;

const getMenusRequest = async (data) => getMenus(data);
const getMenuRequest = async (data) => getMenu(data);
const getUser = (state) => (state.auth.user);
const getJwt = (state) => (state.auth.jwt);

function* getMenusSaga(action) {
  try {
    const { page } = action.payload;
    const jwt = yield select(getJwt);
    const user = yield select(getUser);
    const restaurantIds = user.restaurantes.map((r) => r.id);
    const menusResponse = yield call(getMenusRequest, { jwt, restaurantIds, page });
    // console.log('menusResponse', menusResponse);
    yield put({ type: SET_MENUS, payload: { menusResponse } });
  } catch {
    const menusResponse = [];
    yield put({ type: SET_MENUS, payload: { menusResponse } });
    // set error
  }
}

function* getMenuSingleSaga(action) {
  try {
    const { id } = action.payload;
    const jwt = yield select(getJwt);
    const menuResponse = yield call(getMenuRequest, { jwt, id });
    console.log('menusResponse', menuResponse);
    yield put({ type: SET_MENUS, payload: { menuResponse } });
  } catch {
    const menuResponse = {};
    yield put({ type: SET_MENUS, payload: { menuResponse } });
    // set error
  }
}

// Export generators

export function* watchgetMenusSaga() {
  yield takeLatest(GET_MENUS, getMenusSaga);
}

export function* watchgetMenuSingleSaga() {
  yield takeLatest(GET_MENU, getMenuSingleSaga);
}
