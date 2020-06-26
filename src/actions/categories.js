const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CATEGORIES_LOGIN = 'SET_CATEGORIES_LOGIN';

const getCategory = (payload = {}) => ({ type: GET_CATEGORY, payload });
const getCategories = () => ({ type: GET_CATEGORIES });
const setCategories = (payload = {}) => ({ type: SET_CATEGORIES, payload });
const setCategoriesLogin = (payload = {}) => ({ type: SET_CATEGORIES_LOGIN, payload });

export default {
  types: {
    GET_CATEGORY,
    GET_CATEGORIES,
    SET_CATEGORIES,
    SET_CATEGORIES_LOGIN,
  },
  creators: {
    getCategory,
    getCategories,
    setCategories,
    setCategoriesLogin,
  },
};
