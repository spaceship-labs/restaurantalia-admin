const GET_MENUS = 'GET_MENUS';
const SET_MENUS = 'SET_MENUS';

const getMenus = (payload = {}) => ({ type: GET_MENUS, payload });
const setMenus = (payload = {}) => ({ type: SET_MENUS, payload });

export default {
  types: {
    GET_MENUS,
    SET_MENUS,
  },
  creators: {
    getMenus,
    setMenus,
  },
};
