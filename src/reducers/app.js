import appActions from '../actions/app';

const initalState = {
  loading: false,
  loadingProcess: 0,
};

const appReducer = (state = initalState, action) => {
  const { type } = action;
  if (type === appActions.types.NEW_LOADING_PROCESS) {
    const { loadingProcess } = state;
    const newState = {
      ...state,
      loadingProcess: loadingProcess + 1,
      loading: true,
    };
    return newState;
  }
  if (type === appActions.types.END_LOADING_PROCESS) {
    const { loadingProcess } = state;
    const newState = {
      ...state,
      loadingProcess: loadingProcess - 1,
    };
    return newState;
  }
  return state;
};

export default appReducer;
