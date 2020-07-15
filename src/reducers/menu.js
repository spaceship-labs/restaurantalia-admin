import menusActions from '../actions/menus';

const initalState = {
  loading: false,
  menu: {},
  templates: [],
};

const menuReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === menusActions.types.SET_MENU) {
    return { ...state, menu: { ...payload } };
  }
  if (type === menusActions.types.SET_MENU_LOADING) {
    const { loading } = action.payload;
    const newState = {
      ...state,
      loading,
    };
    return newState;
  }
  if (type === menusActions.types.SET_TEMPLATES) {
    return { ...state, templates: [...payload] };
  }
  return state;
};

export default menuReducer;
