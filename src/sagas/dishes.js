import {
  call, select, put, takeLatest,
} from 'redux-saga/effects';
import history from '../history';
import {
  getCategories, getDishes, getDish, createDish, updateDish, createFiles, deleteFile, deleteDish,
} from '../api';
import dishesActions from '../actions/dishes';
import categoriesActions from '../actions/categories';
import appActions from '../actions/app';

const {
  GET_CATEGORIES_DISHES,
  GET_DISHES,
  GET_DISH,
  SET_DISHES,
  // SET_DISHES_LOADING,
  SET_DISH,
  CREATE_DISH,
  UPDATE_DISH,
  SET_CREATE_CATEGORIES,
  INIT_FORM,
  UPLOAD_DISH_IMAGE,
  DELETE_DISH_IMAGE,
  DELETE_DISH,
} = dishesActions.types;

const {
  SET_CATEGORIES,
} = categoriesActions.types;

const { newLoading, endLoading } = appActions.creators;

const getDishesRequest = async (data) => getDishes(data);
const getCategoriesState = (state) => (state.categories.categoriesIds);
const getCategoriesRequest = async (data) => getCategories(data);
const getDishRequest = async (data) => getDish(data);
const getUser = (state) => (state.auth.user);
const getJwt = (state) => (state.auth.jwt);
const createDishRequest = async (data) => createDish(data);
const updateDishRequest = async (data) => updateDish(data);
const uploadMediaRequest = async (data) => createFiles(data);
const deleteFileRequest = async (data) => deleteFile(data);
const deleteDishRequest = async (data) => deleteDish(data);

function* getCategoriesDishesSaga() {
  yield put(newLoading());
  try {
    const ids = yield select(getCategoriesState);
    if (ids.length === 0) {
      const jwt = yield select(getJwt);
      const user = yield select(getUser);
      const empresasIds = user.empresas.map((r) => r.id);
      const categoriesResponse = yield call(getCategoriesRequest, { jwt, empresasIds });
      console.log(categoriesResponse);
      yield put({ type: SET_CATEGORIES, payload: { categoriesResponse } });
      const categoriesIds = categoriesResponse.map((c) => c.id);
      yield put({ type: GET_DISHES, payload: { categoriesIds } });
    } else {
      yield put({ type: GET_DISHES, payload: { categoriesIds: ids } });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: SET_DISHES_LOADING, payload: { loading: true } });
    yield put(endLoading());
  }
}

function* getDishesSaga() {
  yield put(newLoading());
  try {
    // console.log('GETING DISHES');
    const jwt = yield select(getJwt);
    // const { categoriesIds } = action.payload;
    const user = yield select(getUser);
    const empresasIds = user.empresas.map((r) => r.id);
    if (empresasIds.length > 0) {
      const dishesResponse = yield call(getDishesRequest, { jwt, empresasIds });
      console.log('dishesResponse', empresasIds, dishesResponse);
      yield put({ type: SET_DISHES, payload: { dishesResponse } });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put(endLoading());
  }
}

function* initFormSaga() {
  yield put(newLoading());
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresasIds = user.empresas.map((r) => r.id);
  try {
    const categoriesResponse = yield call(getCategoriesRequest, { jwt, empresasIds });
    const categoriesState = categoriesResponse.map((it) => ({ id: it.id, nombre: it.nombre }));
    yield put({ type: SET_CREATE_CATEGORIES, payload: [...categoriesState] });
  } catch (e) {
    console.log(e);
  } finally {
    yield put(endLoading());
  }
}

function* getDishSaga({ payload: dishId }) {
  yield put(newLoading());
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresasIds = user.empresas.map((r) => r.id);
  console.log('GET DISH', dishId);
  try {
    const dishResponse = yield call(getDishRequest, { jwt, dishId });
    const dishCategories = dishResponse.categorias.map((it) => ({ id: it.id, nombre: it.nombre }));
    const validDish = empresasIds.indexOf(dishResponse.empresa.id);
    // console.log('DISH RESPONSE', validDish, dishResponse);
    if (validDish >= 0) {
      yield put({ type: SET_DISH, payload: { ...dishResponse, categorias: dishCategories } });
    } else {
      yield call(history.push, '/platillos');
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put(endLoading());
  }
}

function* createDishSaga({ payload }) {
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresas = user.empresas.map((r) => r.id);
  const {
    nameField: { value: nombre },
    activoField: { value: activo },
    ordenField: { value: orden },
    precioField: { value: precio },
    cantidadField: { value: cantidad },
    descripcionField: { value: descripcion },
    categoriasField: { value: categorias },
  } = payload;
  const params = {
    nombre,
    activo,
    orden,
    precio,
    cantidad,
    descripcion,
    categorias,
    empresa: empresas[0],
  };
  try {
    const dishPostResponse = yield call(createDishRequest, { jwt, dish: { ...params } });
    yield call(history.push, '/platillos');
    console.log(dishPostResponse);
  } catch (e) {
    console.log(e);
  }
}

function* updateDishSaga({ payload }) {
  yield put(newLoading());
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresas = user.empresas.map((r) => r.id);
  const {
    nameField: { value: nombre },
    activoField: { value: activo },
    ordenField: { value: orden },
    precioField: { value: precio },
    cantidadField: { value: cantidad },
    descripcionField: { value: descripcion },
    categoriasField: { value: categorias },
    dishId,
  } = payload;
  const params = {
    nombre,
    activo,
    orden,
    precio,
    cantidad,
    descripcion,
    categorias,
    empresa: empresas[0],
    dishId,
  };
  try {
    const dishPUResponse = yield call(updateDishRequest, { jwt, dish: { ...params } });
    yield call(history.push, '/platillos');
    console.log(dishPUResponse);
  } catch (e) {
    console.log(e);
  } finally {
    yield put(endLoading());
  }
}

function* uploadDishImageSaga({ payload }) {
  yield put(newLoading());
  const { files, dishId } = payload;
  const jwt = yield select(getJwt);
  // const user = yield select(getUser);
  // eslint-disable-next-line no-undef
  const data = new FormData();
  data.append('ref', 'platillos');
  data.append('refId', dishId);
  data.append('field', 'imagen');
  files.map((f) => data.append('files', f.file, f.file.name));
  try {
    // console.log('UPLOAD 1', dishId, data);
    const uploadResponse = yield call(uploadMediaRequest, { jwt, params: data });
    console.log('UPLOAD 2', uploadResponse);
    // yield call(history.push, `/platillos/editar/${dishId}`);
    yield put({ type: GET_DISH, payload: dishId });
  } catch (e) {
    console.log(e);
    // yield put(endLoading());
  } finally {
    yield put(endLoading());
  }
}

function* deleteDishImageSaga({ payload }) {
  yield put(newLoading());
  const { fileId, dishId } = payload;
  const jwt = yield select(getJwt);
  try {
    const deleteResponse = yield call(deleteFileRequest, { jwt, fileId });
    console.log('DELETE', fileId, dishId, deleteResponse);
    yield put({ type: GET_DISH, payload: dishId });
  } catch (e) {
    console.log(e);
  } finally {
    yield put(endLoading());
  }
}

function* deleteDishSaga({ payload }) {
  const { dishId } = payload;
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresasIds = user.empresas.map((r) => r.id);

  try {
    const dishResponse = yield call(getDishRequest, { jwt, dishId });
    const validDish = empresasIds.indexOf(dishResponse.empresa.id);
    if (validDish >= 0) {
      const dishDELETEesponse = yield call(deleteDishRequest, { jwt, dishId });
      yield call(history.push, '/platillos');
      console.log('DELETE RESPONSE', dishDELETEesponse);
    } else {
      throw new Error('forbidden');
    }
    // hjgj
  } catch (e) {
    console.log('error', e);
    yield call(history.push, '/platillos');
  }
}

// Export generators
export function* watchgetCategoriesDishesSaga() {
  yield takeLatest(GET_CATEGORIES_DISHES, getCategoriesDishesSaga);
}

export function* watchgetDishesSaga() {
  yield takeLatest(GET_DISHES, getDishesSaga);
}

export function* watchgetDishSaga() {
  yield takeLatest(GET_DISH, getDishSaga);
}

export function* watchCreateDishSaga() {
  yield takeLatest(CREATE_DISH, createDishSaga);
}

export function* watchUpdateDishSaga() {
  yield takeLatest(UPDATE_DISH, updateDishSaga);
}

export function* watchInitFormSaga() {
  yield takeLatest(INIT_FORM, initFormSaga);
}

export function* watchUploadDishImageSaga() {
  yield takeLatest(UPLOAD_DISH_IMAGE, uploadDishImageSaga);
}

export function* watchDeleteDishImageSaga() {
  yield takeLatest(DELETE_DISH_IMAGE, deleteDishImageSaga);
}

export function* watchDeleteDishSaga() {
  yield takeLatest(DELETE_DISH, deleteDishSaga);
}

export default function* run() {
  yield takeLatest(GET_CATEGORIES_DISHES, getCategoriesDishesSaga);
  yield takeLatest(GET_DISHES, getDishesSaga);
  yield takeLatest(GET_DISH, getDishSaga);
  yield takeLatest(CREATE_DISH, createDishSaga);
  yield takeLatest(UPDATE_DISH, updateDishSaga);
  yield takeLatest(INIT_FORM, initFormSaga);
  yield takeLatest(DELETE_DISH, deleteDishSaga);
  yield takeLatest(UPLOAD_DISH_IMAGE, uploadDishImageSaga);
  yield takeLatest(DELETE_DISH_IMAGE, deleteDishImageSaga);
}
