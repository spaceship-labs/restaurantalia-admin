const prefix = '@restaurantalia/admin/auth/';

const DO_LOGIN = `${prefix}DO_LOGIN`;
const SET_LOGIN = `${prefix}SET_LOGIN`;
const GET_USER = `${prefix}GET_USER`;
const LOGIN_ERROR = `${prefix}LOGIN_ERROR`;
const LOGOUT = `${prefix}LOGOUT`;

const doLogin = (payload = {}) => ({ type: DO_LOGIN, payload });
const setLogin = (payload = {}) => ({ type: SET_LOGIN, payload });
const getUser = () => ({ type: GET_USER });
const loginError = () => ({ type: LOGIN_ERROR });
const logout = () => ({ type: LOGOUT });

export default {
  types: {
    DO_LOGIN,
    SET_LOGIN,
    GET_USER,
    LOGIN_ERROR,
    LOGOUT,
  },
  creators: {
    doLogin,
    setLogin,
    getUser,
    loginError,
    logout,
  },
};
