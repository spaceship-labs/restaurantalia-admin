const prefix = '@restaurantalia/admin/restaurantes/';

const SET_RESTAURANTES = `${prefix}SET_RESTAURANTES`;

// TODO: Maybe move away ALL of this.
const GET_MENUS = `${prefix}GET_MENUS`;
const GET_MENU = `${prefix}GET_MENU`;
const SET_MENUS = `${prefix}SET_MENUS`;
const SET_MENU = `${prefix}SET_MENU`;
const SET_LOADING = `${prefix}SET_LOADING`;

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
