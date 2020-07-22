import {
  put, call, select, takeLatest,
} from 'redux-saga/effects';

import { login, setToken } from '../api';
import { loadState, saveState, clearState } from '../api/localstorage';
import history from '../history';

import authActions from '../actions/auth';
import restaurantsActions from '../actions/restaurants';

const {
  DO_LOGIN,
  SET_LOGIN,
  GET_USER,
  LOGIN_ERROR,
  LOGOUT,
} = authActions.types;

const {
  SET_LOADING,
  SET_RESTAURANTES,
} = restaurantsActions.types;

const loginRequest = async (data) => login(data);

const userExists = (state) => (state.userId);

function* getDoLoginSaga(action) {
  const logged = yield select(userExists);
  if (!logged) {
    try {
      const loginResponse = yield call(loginRequest, action.payload);
      saveState({
        userId: loginResponse.user.id,
        jwt: loginResponse.jwt,
        user: loginResponse.user,
      });
      yield call(setToken, loginResponse.jwt);
      const result = loginResponse;
      yield put({ type: SET_LOGIN, payload: { result } });
      yield call(history.push, '/');
    } catch {
      yield put({ type: LOGIN_ERROR });
    }
  }
}

function* getUserSaga() {
  const localData = loadState();
  if (!localData.userId) {
    yield call(history.push, '/login');
  } else {
    const loginResponse = {
      userId: localData.user.id,
      jwt: localData.jwt,
      user: localData.user,
    };
    yield call(setToken, loginResponse.jwt);
    yield put({ type: SET_LOGIN, payload: { result: loginResponse } });
    const { restaurantes: restaurantesResponse } = loginResponse.user;
    yield put({ type: SET_RESTAURANTES, payload: { restaurantesResponse } });
    yield put({ type: SET_LOADING, payload: { loading: true } });
  }
}

function* logoutSaga() {
  clearState();
  yield call(history.push, '/login');
}

// Export generators

export function* watchDoLoginSaga() {
  yield takeLatest(DO_LOGIN, getDoLoginSaga);
}

export function* watchGetUserSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

export default function* run() {
  yield takeLatest(DO_LOGIN, getDoLoginSaga);
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
