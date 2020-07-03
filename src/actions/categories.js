const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CATEGORIES_LOADING = 'SET_CATEGORIES_LOADING';
const SET_CATEGORY = 'SET_CATEGORY';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const INIT_CATEGORY_FORM = 'INIT_CATEGORY_FORM';
const SET_CREATE_MENUS = 'SET_CREATE_MENUS';

const getCategory = (payload = {}) => ({ type: GET_CATEGORY, payload });
const getCategories = () => ({ type: GET_CATEGORIES });
const setCategories = (payload = {}) => ({ type: SET_CATEGORIES, payload });
const setCategoriesLoading = (payload = {}) => ({ type: SET_CATEGORIES_LOADING, payload });
const setCategory = (payload = {}) => ({ type: SET_CATEGORY, payload });
const createCategory = (payload = {}) => ({ type: CREATE_CATEGORY, payload });
const updateCategory = (payload = {}) => ({ type: UPDATE_CATEGORY, payload });
const setCreateMenus = (payload = []) => ({ type: SET_CREATE_MENUS, payload });
const initForm = (payload = []) => ({ type: INIT_CATEGORY_FORM, payload });

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
    INIT_CATEGORY_FORM,
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
  },
};
