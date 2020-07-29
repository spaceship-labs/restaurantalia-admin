import appActions from '../actions/app';

const initalState = {
  loading: false,
  loadingProcess: 0,
};

const appReducer = (state = initalState, action) => {
  const { type, payload } = action;
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
  if (type === appActions.types.ADD_ALERT) {
    const { alerts } = state;
    return { ...state, alerts: [...alerts, { ...payload }] };
  }
  if (type === appActions.types.DISMISS_ALERT) {
    const { alerts } = state;
    const alertsArr = [...alerts];
    alertsArr.splice(payload.ind, 1);
    return { ...state, alerts: [...alertsArr] };
  }
  return state;
};

export default appReducer;
