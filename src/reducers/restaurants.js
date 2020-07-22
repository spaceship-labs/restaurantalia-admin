import restaurantActions from '../actions/restaurants';

const initalState = {
  menusList: {},
  menusIds: [],
  menuSingle: {},
  restaurantesList: {},
  restaurantesIds: [],
  loading: false,
};

const formatRestaurantes = (data) => {
  const menusList = data.reduce((r, item) => ({ ...r, [item.slug]: item }), {});
  const menusIds = Object.keys(menusList);
  return { menusList, menusIds };
};

const menusReducer = (state = initalState, action) => {
  const { type, payload } = action;

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
    return newState;
  }
  return state;
};

export default menusReducer;
