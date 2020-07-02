import {
  call, select, put, takeLatest,
} from 'redux-saga/effects';
import { getCategories } from '../api';
import categoriesActions from '../actions/categories';

//  REFACTOr NEEDED
const {
  GET_CATEGORY,
  GET_CATEGORIES,
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
} = categoriesActions.types;

const getCategoriesRequest = async (data) => getCategories(data);
const getUser = (state) => (state.auth.user);
const getJwt = (state) => (state.auth.jwt);

function* getCategoriesSaga() {
  try {
    const jwt = yield select(getJwt);
    const user = yield select(getUser);
    // console.log('GET CATEGORIES SAGA', jwt, user);
    const empresasIds = user.empresas.map((r) => r.id);
    const categoriesResponse = yield call(getCategoriesRequest, { jwt, empresasIds });
    // console.log('categoriesResponse', categoriesResponse);
    yield put({ type: SET_CATEGORIES, payload: { categoriesResponse } });
  } catch (e) {
    console.log(e);
    // set error
  } finally {
    yield put({ type: SET_CATEGORIES_LOADING, payload: { loading: false } });
  }
}

function* getCategorySingleSaga() {
  yield put({ type: SET_CATEGORIES_LOADING, payload: { login: true } });
}

// Export generators

export function* watchgetCategoriesSaga() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}

export function* watchgetCategorySingleSaga() {
  yield takeLatest(GET_CATEGORY, getCategorySingleSaga);
}
