const prefix = '@restaurantalia/admin/categories/';

const GET_CATEGORY = `${prefix}GET_CATEGORY`;
const GET_CATEGORIES = `${prefix}GET_CATEGORIES`;
const SET_CATEGORIES = `${prefix}SET_CATEGORIES`;
const SET_CATEGORY = `${prefix}SET_CATEGORY`;
const CREATE_CATEGORY = `${prefix}CREATE_CATEGORY`;
const UPDATE_CATEGORY = `${prefix}UPDATE_CATEGORY`;
const INIT_FORM = `${prefix}INIT_FORM`;
const UPLOAD_CATEGORY_IMAGE = `${prefix}UPLOAD_CATEGORY_IMAGE`;
const DELETE_CATEGORY_IMAGE = `${prefix}DELETE_CATEGORY_IMAGE`;
const DELETE_CATEGORY = `${prefix}DELETE_CATEGORY`;

// TODO: move away loading
const SET_CATEGORIES_LOADING = `${prefix}SET_CATEGORIES_LOADING`;

// TODO: Maybe move away this action.
const SET_CREATE_MENUS = `${prefix}SET_CREATE_MENUS`;

const getCategory = (payload = {}) => ({ type: GET_CATEGORY, payload });
const getCategories = () => ({ type: GET_CATEGORIES });
const setCategories = (payload = {}) => ({ type: SET_CATEGORIES, payload });
const setCategoriesLoading = (payload = {}) => ({ type: SET_CATEGORIES_LOADING, payload });
const setCategory = (payload = {}) => ({ type: SET_CATEGORY, payload });
const createCategory = (payload = {}) => ({ type: CREATE_CATEGORY, payload });
const updateCategory = (payload = {}) => ({ type: UPDATE_CATEGORY, payload });
const setCreateMenus = (payload = []) => ({ type: SET_CREATE_MENUS, payload });
const initForm = (payload = []) => ({ type: INIT_FORM, payload });
const uploadCategoryImage = (payload = []) => ({ type: UPLOAD_CATEGORY_IMAGE, payload });
const deleteCategoryImage = (payload = []) => ({ type: DELETE_CATEGORY_IMAGE, payload });
const deleteCategory = (payload = []) => ({ type: DELETE_CATEGORY, payload });

export default {
  types: {
    GET_CATEGORY,
    GET_CATEGORIES,
    SET_CATEGORIES,
    SET_CATEGORIES_LOADING,
    SET_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    SET_CREATE_MENUS,
    INIT_FORM,
    UPLOAD_CATEGORY_IMAGE,
    DELETE_CATEGORY_IMAGE,
    DELETE_CATEGORY,
  },
  creators: {
    getCategory,
    getCategories,
    setCategories,
    setCategoriesLoading,
    setCategory,
    createCategory,
    updateCategory,
    setCreateMenus,
    initForm,
    uploadCategoryImage,
    deleteCategoryImage,
    deleteCategory,
  },
};
