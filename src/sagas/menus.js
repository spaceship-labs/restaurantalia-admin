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

//  REFACTOr NEEDED
const {
  INIT_FORM,
  GET_MENUS,
  GET_MENU,
  GET_TEMPLATES,
  SET_TEMPLATES,
  SET_MENU_LOADING,
  SET_MENU,
  UPDATE_MENU,
  DELETE_MENU_IMAGE,
  UPLOAD_IMAGES,
  COPY_TEMPLATE_CONFIG,
  SET_MENUS,
} = menusActions.types;

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
  try {
    const { page } = payload;

    const user = yield select(userSelector);
    const restaurantIds = user.restaurantes.map((r) => r.id);

    const menusResponse = yield call(getMenusRequest, { restaurantIds, page });

    yield put({ type: SET_MENUS, payload: { menusResponse } });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_MENU_LOADING, payload: { loading: false } });
  }
}

function* initFormSaga() {
  yield put({ type: GET_TEMPLATES, payload: null });
}

function* getTemplatesSaga() {
  // console.log('llega al get Templates');
  try {
    const templatesResponse = yield call(getTemplatesRequest);
    // console.log(templatesResponse);
    yield put({ type: SET_TEMPLATES, payload: templatesResponse });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_MENU_LOADING, payload: { loading: false } });
  }
}

function* getMenuSaga({ payload: menuId }) {
  try {
    const menuResponse = yield call(getMenuRequest, { id: menuId });
    // console.log(menuResponse);
    yield put({ type: SET_MENU, payload: menuResponse });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_MENU_LOADING, payload: { loading: false } });
  }
}

function* updateMenuSaga({ payload: { template, menuId } }) {
  // console.log(template);
  const menuTemplateId = yield select(menuTemplateIdSelector);
  // console.log(menuTemplateId);
  try {
    const updateResponse = yield call(
      updateMenuTemplateRequest,
      {
        template: template.value,
        id: menuTemplateId,
      },
    );
    console.log(updateResponse);
  } catch (e) {
    console.log(e);
  } finally {
    yield put({
      type: COPY_TEMPLATE_CONFIG,
      payload: {
        template: template.value,
        menuTemplate: menuTemplateId,
      },
    });
    yield put({ type: GET_MENU, payload: menuId });
    // yield put({ type: SET_MENU_LOADING, payload: { loading: false } });
  }
}

function* deleteMenuImageSaga({ payload: { fileId } }) {
  try {
    yield put({ type: SET_MENU_LOADING, payload: { loading: true } });
    const deleteResponse = yield call(deleteFileRequest, { fileId });
    console.log(deleteResponse);
    const menuId = yield select(menuIdSelector);
    yield put({ type: GET_MENU, payload: menuId });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_MENU_LOADING, payload: { loading: false } });
  }
}

function* uploadImagesSaga({ payload }) {
  yield put({ type: SET_MENU_LOADING, payload: { loading: true } });
  const { logo: logoObj, imagenes: imagenesObj, fondo: fondoObj } = payload;
  const menuTemplateId = yield select(menuTemplateIdSelector);

  try {
    // console.log(payload);

    // Upload logo in case it exists
    if (logoObj.value.length > 0) {
      const logo = logoObj.value[0];
      // console.log('---------------');
      // console.log(logo);
      // console.log('---------------');
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
    console.log(e);
  } finally {
    const menuId = yield select(menuIdSelector);
    yield put({ type: GET_MENU, payload: menuId });
  }
}

function* copyTemplateConfigSaga({ payload }) {
  const { template, menuTemplate } = payload;
  yield put({ type: SET_MENU_LOADING, payload: { loading: true } });
  try {
    const templateObj = yield call(getTemplateRequest, template);
    // console.log(templateObj);
    // console.log(menuTemplate);
    const { configuracion } = templateObj;
    const updateResponse = yield call(updateMenuTemplateRequest, {
      id: menuTemplate,
      configuracion,
    });
    // console.log('/*-/*-/-*/-*/-*/-*/*-');
    console.log(updateResponse);
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: SET_MENU_LOADING, payload: { loading: false } });
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
