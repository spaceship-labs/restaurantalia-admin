const GET_MENUS = 'GET_MENUS';
const GET_MENU = 'GET_MENU';
const SET_MENUS = 'SET_MENUS';
const SET_MENU = 'SET_MENU';
const SET_LOADING = 'SET_LOADING';
const SET_RESTAURANTES = 'SET_RESTAURANTES';

const getMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const getMenu = (payload = {}) => ({ type: GET_MENU, payload });
const setMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const setMenu = (payload = {}) => ({ type: GET_MENU, payload });
const setLoading = (payload = {}) => ({ type: SET_LOADING, payload });
const setRestaurantes = (payload = {}) => ({ type: SET_RESTAURANTES, payload });

export default {
  types: {
    GET_MENUS,
    GET_MENU,
    SET_MENUS,
    SET_MENU,
    SET_LOADING,
    SET_RESTAURANTES,
  },
  creators: {
    getMenus,
    getMenu,
    setMenus,
    setMenu,
    setLoading,
    setRestaurantes,
  },
};
