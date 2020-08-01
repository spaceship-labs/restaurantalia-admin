import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
// import history from '../history';
import {
  getTemplates,
  getMenu,
  updateMenuTemplate,
  deleteFile,
  createFiles,
  getTemplate,
  getMenus,
} from '../api';
import menusActions from '../actions/menus';
import appActions from '../actions/app';

//  REFACTOr NEEDED
const {
  INIT_FORM,
  GET_MENUS,
  GET_MENU,
  GET_TEMPLATES,
  SET_TEMPLATES,
  // SET_MENU_LOADING,
  SET_MENU,
  UPDATE_MENU,
  DELETE_MENU_IMAGE,
  UPLOAD_IMAGES,
  COPY_TEMPLATE_CONFIG,
  SET_MENUS,
} = menusActions.types;

const { newLoading, endLoading, addAlert } = appActions.creators;

const getTemplatesRequest = async (data) => getTemplates(data);
const getMenusRequest = async (data) => getMenus(data);
const getMenuRequest = async (data) => getMenu(data);
const updateMenuTemplateRequest = async (data) => updateMenuTemplate(data);
const uploadMediaRequest = async (data) => createFiles(data);
const deleteFileRequest = async (data) => deleteFile(data);
const getTemplateRequest = async (data) => getTemplate(data);

const menuTemplateIdSelector = ({ menu: { menu } }) => menu.menus_template.id;
const menuIdSelector = ({ menu: { menu: { id } } }) => id;
const userSelector = (state) => (state.auth.user);

function* getMenusSaga({ payload }) {
  yield put(newLoading());
  try {
    const { page } = payload;

    const user = yield select(userSelector);
    const restaurantIds = user.restaurantes.map((r) => r.id);

    const menusResponse = yield call(getMenusRequest, { restaurantIds, page });

    yield put({ type: SET_MENUS, payload: { menusResponse } });
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al cargar la lista de menus intenta de nuevo.',
      type: 'error',
      id: `MENUS-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* initFormSaga() {
  yield put({ type: GET_TEMPLATES, payload: null });
}

function* getTemplatesSaga() {
  yield put(newLoading());
  try {
    const templatesResponse = yield call(getTemplatesRequest);
    yield put({ type: SET_TEMPLATES, payload: templatesResponse });
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al cargar la lista de templates intenta de nuevo.',
      type: 'error',
      id: `MENUS-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* getMenuSaga({ payload: menuId }) {
  yield put(newLoading());
  try {
    const menuResponse = yield call(getMenuRequest, { id: menuId });
    yield put({ type: SET_MENU, payload: menuResponse });
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al cargar el menu intenta de nuevo.',
      type: 'error',
      id: `MENUS-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* updateMenuSaga({ payload: { template, menuId } }) {
  const menuTemplateId = yield select(menuTemplateIdSelector);
  try {
    yield call(
      updateMenuTemplateRequest,
      {
        template: template.value,
        id: menuTemplateId,
      },
    );
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: false,
      msg: 'El menu fue actualizaco correctamente.',
      type: 'success',
      id: `MENUS-${idNumber}`,
    }));
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al actualizar el menu intenta de nuevo.',
      type: 'error',
      id: `MENUS-${idNumber}`,
    }));
  } finally {
    yield put({
      type: COPY_TEMPLATE_CONFIG,
      payload: {
        template: template.value,
        menuTemplate: menuTemplateId,
      },
    });
    yield put({ type: GET_MENU, payload: menuId });
    yield put(endLoading());
  }
}

function* deleteMenuImageSaga({ payload: { fileId } }) {
  yield put(newLoading());
  try {
    yield call(deleteFileRequest, { fileId });
    const menuId = yield select(menuIdSelector);
    yield put({ type: GET_MENU, payload: menuId });
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: false,
      msg: 'El menu fue actualizaco correctamente.',
      type: 'success',
      id: `MENUS-${idNumber}`,
    }));
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al actualizar el menu intenta de nuevo.',
      type: 'error',
      id: `MENUS-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

function* uploadImagesSaga({ payload }) {
  yield put(newLoading());
  const { logo: logoObj, imagenes: imagenesObj, fondo: fondoObj } = payload;
  const menuTemplateId = yield select(menuTemplateIdSelector);

  try {
    if (logoObj.value.length > 0) {
      const logo = logoObj.value[0];
      const uploadLogo = new FormData();
      uploadLogo.append('ref', 'menus-template');
      uploadLogo.append('refId', menuTemplateId);
      uploadLogo.append('field', 'logo');
      uploadLogo.append('files', logo.file, logo.file.name);
      yield call(uploadMediaRequest, { params: uploadLogo });
    }

    // Upload fondo in case it exists
    if (fondoObj.value.length > 0) {
      const fondo = fondoObj.value[0];
      const uploadFondo = new FormData();
      uploadFondo.append('ref', 'menus-template');
      uploadFondo.append('refId', menuTemplateId);
      uploadFondo.append('field', 'fondo');
      uploadFondo.append('files', fondo.file, fondo.file.name);
      yield call(uploadMediaRequest, { params: uploadFondo });
    }

    // Upload images in case it exists
    if (imagenesObj.value.length > 0) {
      const imagenes = [...imagenesObj.value];
      const uploadImages = new FormData();
      uploadImages.append('ref', 'menus-template');
      uploadImages.append('refId', menuTemplateId);
      uploadImages.append('field', 'imagenes');
      imagenes.map((it) => uploadImages.append('files', it.file, it.file.name));
      yield call(uploadMediaRequest, { params: uploadImages });
    }
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al actualizar el menu intenta de nuevo.',
      type: 'error',
      id: `MENUS-${idNumber}`,
    }));
  } finally {
    const menuId = yield select(menuIdSelector);
    yield put({ type: GET_MENU, payload: menuId });
    yield put(endLoading());
  }
}

function* copyTemplateConfigSaga({ payload }) {
  const { template, menuTemplate } = payload;
  yield put(newLoading());
  try {
    const templateObj = yield call(getTemplateRequest, template);
    const { configuracion } = templateObj;
    yield call(updateMenuTemplateRequest, {
      id: menuTemplate,
      configuracion,
    });
  } catch (e) {
    const random = Math.random() * 10000000;
    const idNumber = random % 1000;
    yield put(addAlert({
      err: e,
      msg: 'Hubo un error al generar la configuracion de tu plantilla intenta de nuevo.',
      type: 'error',
      id: `DISHES-${idNumber}`,
    }));
  } finally {
    yield put(endLoading());
  }
}

// Export generator

export default function* run() {
  yield takeLatest(GET_MENUS, getMenusSaga);
  yield takeLatest(INIT_FORM, initFormSaga);
  yield takeLatest(GET_TEMPLATES, getTemplatesSaga);
  yield takeLatest(GET_MENU, getMenuSaga);
  yield takeLatest(UPDATE_MENU, updateMenuSaga);
  yield takeLatest(DELETE_MENU_IMAGE, deleteMenuImageSaga);
  yield takeLatest(UPLOAD_IMAGES, uploadImagesSaga);
  yield takeLatest(COPY_TEMPLATE_CONFIG, copyTemplateConfigSaga);
}
