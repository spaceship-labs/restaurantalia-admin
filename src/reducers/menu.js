import restaurantActions from '../actions/restaurants';

const initalState = {
  menusList: {},
  menuSingle: {},
};

const formatMenus = (data) => data.reduce((r, item) => ({ ...r, [item.slug]: item }), {});

const menusReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === restaurantActions.types.SET_MENUS) {
    const { menusResponse } = payload;
    const menusList = formatMenus(menusResponse);
    const newState = {
      ...state,
      menusList,
    };
    console.log('menus state', newState);
    return newState;
  }
  if (type === restaurantActions.types.SET_MENU) {
    const { menuSingle } = action.payload;
    const newState = {
      ...state,
      menuSingle,
    };
    return newState;
  }
  return state;
};

export default menusReducer;
