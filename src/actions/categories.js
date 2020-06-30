const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CATEGORIES_LOADING = 'SET_CATEGORIES_LOADING';

const getCategory = (payload = {}) => ({ type: GET_CATEGORY, payload });
const getCategories = () => ({ type: GET_CATEGORIES });
const setCategories = (payload = {}) => ({ type: SET_CATEGORIES, payload });
const setCategoriesLoading = (payload = {}) => ({ type: SET_CATEGORIES_LOADING, payload });

export default {
  types: {
    GET_CATEGORY,
    GET_CATEGORIES,
    SET_CATEGORIES,
    SET_CATEGORIES_LOADING,
  },
  creators: {
    getCategory,
    getCategories,
    setCategories,
    setCategoriesLoading,
  },
};
