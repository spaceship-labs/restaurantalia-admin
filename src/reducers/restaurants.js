import restaurantActions from '../actions/restaurants';

const googleUrl = 'https://chart.googleapis.com/chart?cht=qr&choe=UTF-8&chs=500x500&chl=';

const initalState = {
  menusList: {},
  menusIds: [],
  menuSingle: {},
  restaurantesList: {},
  restaurantesIds: [],
  loading: false,
};

const getUrl = (menu) => {
  const pageUrl = 'http://restaurantalia.com/';
  const { slug, restaurante } = menu;
  return `${pageUrl}${restaurante.slug}/${slug}`;
};

const generateQrUrl = (menu) => `${googleUrl}${getUrl(menu)}`;

const formatMenus = (data) => {
  const menusList = data.reduce((r, item) => {
    const newItem = {
      ...item,
      restauranteNombre: item.restaurante.nombre,
      qrUrl: generateQrUrl(item),
      url: getUrl(item),
    };
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
