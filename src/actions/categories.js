const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CATEGORIES_LOADING = 'SET_CATEGORIES_LOADING';
const CREATE_CATEGORY = 'CREATE_CATEGORY';

const getCategory = (payload = {}) => ({ type: GET_CATEGORY, payload });
const getCategories = () => ({ type: GET_CATEGORIES });
const setCategories = (payload = {}) => ({ type: SET_CATEGORIES, payload });
const setCategoriesLoading = (payload = {}) => ({ type: SET_CATEGORIES_LOADING, payload });
const createCategory = (payload = {}) => ({ type: CREATE_CATEGORY, payload });

export default {
  types: {
    GET_CATEGORY,
    GET_CATEGORIES,
    SET_CATEGORIES,
    SET_CATEGORIES_LOADING,
    CREATE_CATEGORY,
  },
  creators: {
    getCategory,
    getCategories,
    setCategories,
    setCategoriesLoading,
    createCategory,
  },
};
