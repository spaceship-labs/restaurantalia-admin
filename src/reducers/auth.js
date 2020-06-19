import authActions from '../actions/auth';

const initalState = {
  userId: 0,
  user: {},
  jwt: '',
  loginError: '',
};

const authReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === authActions.types.SET_LOGIN) {
    const { jwt, user } = payload.result;
    const newState = {
      ...state,
      userId: user.id,
      user,
      jwt,
    };
    return newState;
  }
  if (type === authActions.types.LOGIN_ERROR) {
    const newState = { ...state, loginError: 'Error??' };
    return newState;
  }
  if (type === authActions.types.LOGOUT) {
    const newState = { ...initalState };
    return newState;
  }
  return state;
};

export default authReducer;
