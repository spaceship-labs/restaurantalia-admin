import {
  call, select, put, takeLatest,
} from 'redux-saga/effects';
import { getCategories, getDishes } from '../api';
import dishesActions from '../actions/dishes';
import categoriesActions from '../actions/categories';

const {
  GET_CATEGORIES_DISHES,
  GET_DISHES,
  SET_DISHES,
  SET_DISHES_LOADING,
} = dishesActions.types;

const {
  SET_CATEGORIES,
} = categoriesActions.types;

const getDishesRequest = async (data) => getDishes(data);
const getCategoriesState = (state) => (state.categories.categoriesIds);
const getCategoriesRequest = async (data) => getCategories(data);
const getUser = (state) => (state.auth.user);
const getJwt = (state) => (state.auth.jwt);

function* getCategoriesDishesSaga() {
  try {
    const ids = yield select(getCategoriesState);
    if (ids.length === 0) {
      const jwt = yield select(getJwt);
      const user = yield select(getUser);
      const empresasIds = user.empresas.map((r) => r.id);
      const categoriesResponse = yield call(getCategoriesRequest, { jwt, empresasIds });
      yield put({ type: SET_CATEGORIES, payload: { categoriesResponse } });
      const categoriesIds = categoriesResponse.map((c) => c.id);
      yield put({ type: GET_DISHES, payload: { categoriesIds } });
    } else {
      yield put({ type: GET_DISHES, payload: { categoriesIds: ids } });
    }
  } catch {
    yield put({ type: SET_DISHES_LOADING, payload: { loading: true } });
  }
}

function* getDishesSaga(action) {
  try {
    // console.log('GETING DISHES');
    const jwt = yield select(getJwt);
    const { categoriesIds } = action.payload;
    if (categoriesIds.length > 0) {
      const dishesResponse = yield call(getDishesRequest, { jwt, categoriesIds });
      // console.log('dishesResponse', categoriesIds, dishesResponse);
      yield put({ type: SET_DISHES, payload: { dishesResponse } });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_DISHES_LOADING, payload: { loading: false } });
  }
}

// Export generators
export function* watchgetCategoriesDishesSaga() {
  yield takeLatest(GET_CATEGORIES_DISHES, getCategoriesDishesSaga);
}

export function* watchgetDishesSaga() {
  yield takeLatest(GET_DISHES, getDishesSaga);
}
