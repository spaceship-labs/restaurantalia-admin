const GET_DISH = 'GET_DISH';
const GET_CATEGORIES_DISHES = 'GET_CATEGORIES_DISHES';
const GET_DISHES = 'GET_DISHES';
const SET_DISHES = 'SET_DISHES';
const SET_DISHES_LOADING = 'SET_DISHES_LOADING';
const SET_DISH = 'SET_DISH';
const CREATE_DISH = 'CREATE_DISH';
const UPDATE_DISH = 'UPDATE_DISH';
const SET_CREATE_CATEGORIES = 'SET_CREATE_CATEGORIES';

const getDish = (payload = {}) => ({ type: GET_DISH, payload });
const getCategoriesDishes = (payload = {}) => ({ type: GET_CATEGORIES_DISHES, payload });
const getDishes = (payload = {}) => ({ type: GET_DISHES, payload });
const setDishes = (payload = {}) => ({ type: SET_DISHES, payload });
const setDishesLoading = (payload = {}) => ({ type: SET_DISHES_LOADING, payload });
const setDish = (payload = {}) => ({ type: SET_DISH, payload });
const createDish = (payload = {}) => ({ type: CREATE_DISH, payload });
const updateDish = (payload = {}) => ({ type: UPDATE_DISH, payload });
const setCreateCategories = (payload = []) => ({ type: SET_CREATE_CATEGORIES, payload });

export default {
  types: {
    GET_DISH,
    GET_CATEGORIES_DISHES,
    GET_DISHES,
    SET_DISHES,
    SET_DISHES_LOADING,
    SET_DISH,
    CREATE_DISH,
    UPDATE_DISH,
    SET_CREATE_CATEGORIES,
  },
  creators: {
    getDish,
    getCategoriesDishes,
    getDishes,
    setDishes,
    setDishesLoading,
    setDish,
    createDish,
    updateDish,
    setCreateCategories,
  },
};
