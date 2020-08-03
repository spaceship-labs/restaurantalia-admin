import menusActions from '../actions/menus';

const GOOGLE_URL = 'https://chart.googleapis.com/chart?cht=qr&choe=UTF-8&chs=500x500&chl=';

const initalState = {
  loading: false,
  menu: {},
  templates: [],
};

const getUrl = (menu) => {
  const pageUrl = 'http://restaurantalia.com/';
  const { slug, restaurante } = menu;
  return `${pageUrl}${restaurante.slug}/${slug}`;
};

const generateQrUrl = (menu) => `${GOOGLE_URL}${getUrl(menu)}`;

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

const menuReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === menusActions.types.SET_MENUS) {
    const { menusResponse } = payload;
    const { menusList, menusIds } = formatMenus(menusResponse);
    const newState = {
      ...state,
      menusList,
      menusIds,
    };
    return newState;
  }
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
