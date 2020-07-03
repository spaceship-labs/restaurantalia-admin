import {
  call, select, put, takeLatest,
} from 'redux-saga/effects';
import history from '../history';
import {
  getCategories, getMenus, getCategory, createCategory, updateCategory,
} from '../api';
import categoriesActions from '../actions/categories';

//  REFACTOr NEEDED
const {
  GET_CATEGORY,
  GET_CATEGORIES,
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_CREATE_MENUS,
  INIT_CATEGORY_FORM,
  SET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} = categoriesActions.types;

const getMenusRequest = async (data) => getMenus(data);
const getCategoryRequest = async (data) => getCategory(data);
const getCategoriesRequest = async (data) => getCategories(data);
const createCategoryRequest = async (data) => createCategory(data);
const updateCategoryRequest = async (data) => updateCategory(data);
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

function* initFormSaga() {
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const restaurantIds = user.restaurantes.map((r) => r.id);
  try {
    const menusResponse = yield call(getMenusRequest, { jwt, restaurantIds });
    const menusState = menusResponse.map((it) => ({ id: it.id, nombre: it.nombre }));
    yield put({ type: SET_CREATE_MENUS, payload: [...menusState] });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_CATEGORIES_LOADING, payload: { loading: false } });
  }
}

function* getCategorySaga({ payload: catId }) {
  const jwt = yield select(getJwt);
  try {
    const catResponse = yield call(getCategoryRequest, { jwt, catId });
    const catMenus = catResponse.menus.map((it) => ({ id: it.id, nombre: it.nombre }));
    yield put({ type: SET_CATEGORY, payload: { ...catResponse, menus: catMenus } });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_CATEGORIES_LOADING, payload: { loading: false } });
  }
}

function* createCategorySaga({ payload }) {
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresas = user.empresas.map((r) => r.id);
  const {
    nombreField: { value: nombre },
    ordenField: { value: orden },
    descripcionField: { value: descripcion },
    menusField: { value: menus },
  } = payload;
  const params = {
    nombre,
    orden,
    descripcion,
    menus,
    empresa: empresas[0],
  };
  try {
    const catPostResponse = yield call(createCategoryRequest, { jwt, cat: { ...params } });
    yield call(history.push, '/categorias');
    console.log(catPostResponse);
  } catch (e) {
    console.log(e);
  }
}

function* updateCategorySaga({ payload }) {
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresas = user.empresas.map((r) => r.id);
  const {
    nombreField: { value: nombre },
    ordenField: { value: orden },
    descripcionField: { value: descripcion },
    menusField: { value: menus },
    catId,
  } = payload;
  const params = {
    nombre,
    orden,
    descripcion,
    menus,
    empresa: empresas[0],
    catId,
  };
  try {
    const catPUTResponse = yield call(updateCategoryRequest, { jwt, cat: { ...params } });
    console.log(catPUTResponse);
    yield call(history.push, '/categorias');
  } catch (e) {
    console.log(e);
  }
}

// Export generators

export function* watchgetCategoriesSaga() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}

export function* watchInitCategoryFormSaga() {
  yield takeLatest(INIT_CATEGORY_FORM, initFormSaga);
}

export function* watchgetCategorySaga() {
  yield takeLatest(GET_CATEGORY, getCategorySaga);
}

export function* watchCreateCategorySaga() {
  yield takeLatest(CREATE_CATEGORY, createCategorySaga);
}

export function* watchUpdateCategorySaga() {
  yield takeLatest(UPDATE_CATEGORY, updateCategorySaga);
}
