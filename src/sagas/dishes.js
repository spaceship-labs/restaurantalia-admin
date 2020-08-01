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

const { newLoading, endLoading, addAlert } = appActions.creators;

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
      yield put({ type: SET_CATEGORIES, payload: { categoriesResponse } });
      const categoriesIds = categoriesResponse.map((c) => c.id);
      yield put({ type: GET_DISHES, payload: { categoriesIds } });
    } else {
      yield put({ type: GET_DISHES, payload: { categoriesIds: ids } });
    }
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al la lista de platillos intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
  } finally {
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
      yield put({ type: SET_DISHES, payload: { dishesResponse } });
    }
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al la lista de platillos intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
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
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al cargar la pagina intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* getDishSaga({ payload: dishId }) {
  yield put(newLoading());
  const jwt = yield select(getJwt);
  const user = yield select(getUser);
  const empresasIds = user.empresas.map((r) => r.id);
  try {
    const dishResponse = yield call(getDishRequest, { jwt, dishId });
    const dishCategories = dishResponse.categorias.map((it) => ({ id: it.id, nombre: it.nombre }));
    const validDish = empresasIds.indexOf(dishResponse.empresa.id);
    if (validDish >= 0) {
      yield put({ type: SET_DISH, payload: { ...dishResponse, categorias: dishCategories } });
    } else {
      yield call(history.push, '/platillos');
    }
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al obtener la informacion del platillo intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
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
    yield call(createDishRequest, { jwt, dish: { ...params } });
    yield call(history.push, '/platillos');
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: false,
      msg: `El platillo "${nombre}" fue creado correctamente.`,
      type: 'success',
      id: `CATEGORIES-${idNumber}`,
    }));
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al crear el platillo intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
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
    yield call(updateDishRequest, { jwt, dish: { ...params } });
    yield call(history.push, '/platillos');
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: false,
      msg: `El platillo "${nombre}" fue actualizado correctamente.`,
      type: 'success',
      id: `CATEGORIES-${idNumber}`,
    }));
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al actualizar la informacion del platillo intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* uploadDishImageSaga({ payload }) {
  yield put(newLoading());
  const { files, dishId } = payload;
  const jwt = yield select(getJwt);
  // eslint-disable-next-line no-undef
  const data = new FormData();
  data.append('ref', 'platillos');
  data.append('refId', dishId);
  data.append('field', 'imagen');
  files.map((f) => data.append('files', f.file, f.file.name));
  try {
    yield call(uploadMediaRequest, { jwt, params: data });
    yield put({ type: GET_DISH, payload: dishId });
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al la lista de platillos intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* deleteDishImageSaga({ payload }) {
  yield put(newLoading());
  const { fileId, dishId } = payload;
  const jwt = yield select(getJwt);
  try {
    yield call(deleteFileRequest, { jwt, fileId });
    yield put({ type: GET_DISH, payload: dishId });
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al borrar la imagen intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
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
      yield call(deleteDishRequest, { jwt, dishId });
      yield call(history.push, '/platillos');
      const random = Math.random() * 10000000;
      const idNumber = random % 1000;
      yield put(addAlert({
        err: false,
        msg: 'El platillo fue eliminado correctamente.',
        type: 'success',
        id: `CATEGORIES-${idNumber}`,
      }));
    } else {
      throw new Error('forbidden');
    }
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al borrar el platillo intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
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
