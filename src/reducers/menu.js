import restaurantActions from '../actions/restaurants';

const initalState = {
  menusList: {},
  menusIds: [],
  menuSingle: {},
  restaurantesList: {},
  restaurantesIds: [],
  loading: false,
};

const formatMenus = (data) => {
  const menusList = data.reduce((r, item) => {
    const newItem = { ...item, restauranteNombre: item.restaurante.nombre };
    return { ...r, [item.slug]: newItem };
  }, {});
  const menusIds = Object.keys(menusList);
  return { menusList, menusIds };
};

const formatRestaurantes = (data) => {
  const menusList = data.reduce((r, item) => ({ ...r, [item.slug]: item }), {});
  const menusIds = Object.keys(menusList);
  return { menusList, menusIds };
};

const menusReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === restaurantActions.types.SET_MENUS) {
    const { menusResponse } = payload;
    const { menusList, menusIds } = formatMenus(menusResponse);
    const newState = {
      ...state,
      menusList,
      menusIds,
    };
    // console.log('menus state', newState);
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
  if (type === restaurantActions.types.SET_LOADING) {
    const { loading } = action.payload;
    const newState = {
      ...state,
      loading,
    };
    return newState;
  }
  if (type === restaurantActions.types.SET_RESTAURANTES) {
    const { restaurantesResponse } = payload;
    const { menusList, menusIds } = formatRestaurantes(restaurantesResponse);
    const newState = {
      ...state,
      restaurantesList: menusList,
      restaurantesIds: menusIds,
    };
    // console.log('restaurantes state', newState);
    return newState;
  }
  return state;
};

export default menusReducer;
