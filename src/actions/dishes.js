const GET_DISH = 'GET_DISH';
const GET_CATEGORIES_DISHES = 'GET_CATEGORIES_DISHES';
const GET_DISHES = 'GET_DISHES';
const SET_DISHES = 'SET_DISHES';
const SET_DISHES_LOADING = 'SET_DISHES_LOADING';

const getDish = (payload = {}) => ({ type: GET_DISH, payload });
const getCategoriesDishes = (payload = {}) => ({ type: GET_CATEGORIES_DISHES, payload });
const getDishes = (payload = {}) => ({ type: GET_DISHES, payload });
const setDishes = (payload = {}) => ({ type: SET_DISHES, payload });
const setDishesLoading = (payload = {}) => ({ type: SET_DISHES_LOADING, payload });

export default {
  types: {
    GET_DISH,
    GET_CATEGORIES_DISHES,
    GET_DISHES,
    SET_DISHES,
    SET_DISHES_LOADING,
  },
  creators: {
    getDish,
    getCategoriesDishes,
    getDishes,
    setDishes,
    setDishesLoading,
  },
};
