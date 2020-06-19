const DO_LOGIN = 'DO_LOGIN';
const SET_LOGIN = 'SET_LOGIN';
const GET_USER = 'GET_USER';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';

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
