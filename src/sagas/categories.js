import {
  call, select, put, takeLatest,
} from 'redux-saga/effects';
import history from '../history';
import {
  getCategories,
  getMenus,
  getCategory,
  createCategory,
  updateCategory,
  createFiles,
  deleteFile,
  deleteCategory,
} from '../api';
import categoriesActions from '../actions/categories';
import appActions from '../actions/app';

//  REFACTOr NEEDED
const {
  GET_CATEGORY,
  GET_CATEGORIES,
  SET_CATEGORIES,
  SET_CREATE_MENUS,
  INIT_FORM,
  SET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  UPLOAD_CATEGORY_IMAGE,
  DELETE_CATEGORY_IMAGE,
  DELETE_CATEGORY,
} = categoriesActions.types;

const { newLoading, endLoading } = appActions.creators;

const getMenusRequest = async (data) => getMenus(data);
const getCategoryRequest = async (data) => getCategory(data);
const getCategoriesRequest = async (data) => getCategories(data);
const createCategoryRequest = async (data) => createCategory(data);
const updateCategoryRequest = async (data) => updateCategory(data);
const uploadMediaRequest = async (data) => createFiles(data);
const deleteFileRequest = async (data) => deleteFile(data);
const deleteDishRequest = async (data) => deleteCategory(data);
const getUser = (state) => (state.auth.user);
const getJwt = (state) => (state.auth.jwt);

function* getCategoriesSaga() {
  yield put(newLoading());
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
    yield put(endLoading());
  }
}

function* initFormSaga() {
  yield put(newLoading());
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
    yield put(endLoading());
  }
}

function* getCategorySaga({ payload: catId }) {
  yield put(newLoading());
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresasIds = user.empresas.map((r) => r.id);
  try {
    const catResponse = yield call(getCategoryRequest, { jwt, catId });
    const catMenus = catResponse.menus.map((it) => ({ id: it.id, nombre: it.nombre }));
    const validCat = empresasIds.indexOf(catResponse.empresa.id);
    if (validCat >= 0) {
      yield put({ type: SET_CATEGORY, payload: { ...catResponse, menus: catMenus } });
    } else {
      yield call(history.push, '/categorias');
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put(endLoading());
  }
}

function* createCategorySaga({ payload }) {
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresas = user.empresas.map((r) => r.id);
  const {
    nombreField: { value: nombre },
    activoField: { value: activo },
    ordenField: { value: orden },
    descripcionField: { value: descripcion },
    menusField: { value: menus },
  } = payload;
  const params = {
    nombre,
    activo,
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
    activoField: { value: activo },
    ordenField: { value: orden },
    descripcionField: { value: descripcion },
    menusField: { value: menus },
    catId,
  } = payload;
  const params = {
    nombre,
    activo,
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

function* uploadCategoryImageSaga({ payload }) {
  yield put(newLoading());
  const { files, catId } = payload;
  const jwt = yield select(getJwt);
  // const user = yield select(getUser);
  // eslint-disable-next-line no-undef
  const data = new FormData();
  data.append('ref', 'categorias');
  data.append('refId', catId);
  data.append('field', 'imagen');
  files.map((f) => data.append('files', f.file, f.file.name));
  try {
    // console.log('UPLOAD 1', catId, data);
    const uploadResponse = yield call(uploadMediaRequest, { jwt, params: data });
    console.log('UPLOAD 2', uploadResponse);
    // yield call(history.push, `/platillos/editar/${catId}`);
    yield put({ type: GET_CATEGORY, payload: catId });
  } catch (e) {
    console.log(e);
    yield put(endLoading());
  }
}

function* deleteCategorySaga({ payload }) {
  const { catId } = payload;
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresasIds = user.empresas.map((r) => r.id);

  try {
    const dishResponse = yield call(getCategoryRequest, { jwt, catId });
    const validCat = empresasIds.indexOf(dishResponse.empresa.id);
    if (validCat >= 0) {
      const dishDELETEesponse = yield call(deleteDishRequest, { jwt, catId });
      yield call(history.push, '/categorias');
      console.log('DELETE RESPONSE', dishDELETEesponse);
    } else {
      throw new Error('forbidden');
    }
    // hjgj
  } catch (e) {
    console.log('error', e);
    yield call(history.push, '/categorias');
  }
}

function* deleteCategoryImageSaga({ payload }) {
  yield put(newLoading());
  const { fileId, catId } = payload;
  const jwt = yield select(getJwt);
  // const user = yield select(getUser);
  try {
    const deleteResponse = yield call(deleteFileRequest, { jwt, fileId });
    console.log('DELETE', fileId, catId, deleteResponse);
    yield put({ type: GET_CATEGORY, payload: catId });
    // yield call(history.push, `/platillos/editar/${catId}`);
  } catch (e) {
    console.log(e);
    yield put(endLoading());
  }
}

// Export generators
export function* watchgetCategoriesSaga() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}

export function* watchInitCategoryFormSaga() {
  yield takeLatest(INIT_FORM, initFormSaga);
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

export function* watchUploadCategoryImageSaga() {
  yield takeLatest(UPLOAD_CATEGORY_IMAGE, uploadCategoryImageSaga);
}

export function* watchDeleteCategoryImageSaga() {
  yield takeLatest(DELETE_CATEGORY_IMAGE, deleteCategoryImageSaga);
}

export function* watchDeleteCategorySaga() {
  yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}

export default function* run() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
  yield takeLatest(INIT_FORM, initFormSaga);
  yield takeLatest(GET_CATEGORY, getCategorySaga);
  yield takeLatest(CREATE_CATEGORY, createCategorySaga);
  yield takeLatest(UPDATE_CATEGORY, updateCategorySaga);
  yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}
