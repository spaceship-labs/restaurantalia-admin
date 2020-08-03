const prefix = '@restaurantalia/admin/menus/';

const GET_MENUS = `${prefix}GET_MENUS`;
const SET_MENUS = `${prefix}SET_MENUS`;
const GET_MENU = `${prefix}GET_MENU`;
const SET_MENU = `${prefix}SET_MENU`;
const INIT_FORM = `${prefix}INIT_FORM`;
const UPDATE_MENU = `${prefix}UPDATE_MENU`;
const UPLOAD_IMAGES = `${prefix}UPLOAD_IMAGES`;
const GET_TEMPLATES = `${prefix}GET_TEMPLATES`;
const SET_TEMPLATES = `${prefix}SET_TEMPLATES`;
const DELETE_MENU_IMAGE = `${prefix}DELETE_MENU_IMAGE`;
const COPY_TEMPLATE_CONFIG = `${prefix}COPY_TEMPLATE_CONFIG`;

// TODO: Move away this loading
const SET_MENU_LOADING = `${prefix}SET_MENU_LOADING`;

const getMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const setMenus = (payload = {}) => ({ type: SET_MENUS, payload });
const getMenu = (payload = {}) => ({ type: GET_MENU, payload });
const setMenu = (payload = {}) => ({ type: SET_MENU, payload });
const setMenuLoading = (payload = {}) => ({ type: SET_MENU_LOADING, payload });
const initMenuForm = (payload = {}) => ({ type: INIT_FORM, payload });
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
    INIT_FORM,
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
