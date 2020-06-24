const GET_MENUS = 'GET_MENUS';
const GET_MENU = 'GET_MENU';
const SET_MENUS = 'SET_MENUS';
const SET_MENU = 'SET_MENU';

const getMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const getMenu = (payload = {}) => ({ type: GET_MENU, payload });
const setMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const setMenu = (payload = {}) => ({ type: GET_MENU, payload });

export default {
  types: {
    GET_MENUS,
    GET_MENU,
    SET_MENUS,
    SET_MENU,
  },
  creators: {
    getMenus,
    getMenu,
    setMenus,
    setMenu,
  },
};
