const GET_MENUS = 'GET_MENUS';
const SET_MENUS = 'SET_MENUS';
const GET_MENU = 'GET_MENU';
const SET_MENU = 'SET_MENU';
const SET_MENU_LOADING = 'SET_MENU_LOADING';
const INIT_MENU_FORM = 'INIT_MENU_FORM';
const UPDATE_MENU = 'UPDATE_MENU';
const UPLOAD_IMAGES = 'UPLOAD_IMAGES';
const GET_TEMPLATES = 'GET_TEMPLATES';
const SET_TEMPLATES = 'SET_TEMPLATES';
const DELETE_MENU_IMAGE = 'DELETE_MENU_IMAGE';
const COPY_TEMPLATE_CONFIG = 'COPY_TEMPLATE_CONFIG';

const getMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const setMenus = (payload = {}) => ({ type: SET_MENUS, payload });
const getMenu = (payload = {}) => ({ type: GET_MENU, payload });
const setMenu = (payload = {}) => ({ type: SET_MENU, payload });
const setMenuLoading = (payload = {}) => ({ type: SET_MENU_LOADING, payload });
const initMenuForm = (payload = {}) => ({ type: INIT_MENU_FORM, payload });
const updateMenu = (payload = {}) => ({ type: UPDATE_MENU, payload });
const uploadImages = (payload = {}) => ({ type: UPLOAD_IMAGES, payload });
const getTemplates = (payload = {}) => ({ type: GET_TEMPLATES, payload });
const setTemplates = (payload = {}) => ({ type: SET_TEMPLATES, payload });
const deleteMenuImage = (payload = {}) => ({ type: DELETE_MENU_IMAGE, payload });
const copyTemplateConfig = (payload = {}) => ({ type: COPY_TEMPLATE_CONFIG, payload });

export default {
  types: {
    GET_MENUS,
    SET_MENUS,
    GET_MENU,
    SET_MENU,
    SET_MENU_LOADING,
    INIT_MENU_FORM,
    UPLOAD_IMAGES,
    GET_TEMPLATES,
    SET_TEMPLATES,
    DELETE_MENU_IMAGE,
    UPDATE_MENU,
    COPY_TEMPLATE_CONFIG,
  },
  creators: {
    getMenus,
    setMenus,
    getMenu,
    setMenu,
    setMenuLoading,
    initMenuForm,
    updateMenu,
    uploadImages,
    getTemplates,
    setTemplates,
    deleteMenuImage,
    copyTemplateConfig,
  },
};
