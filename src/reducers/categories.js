import categoriesActions from '../actions/categories';

const initalState = {
  categoriesList: {},
  categoriesIds: [],
  loading: false,
  category: {
    nombre: '',
    orden: '1',
    descripcion: '',
    menus: [],
  },
  menus: [],
};

const formatCategories = (data) => {
  const categoriesList = data.reduce((r, item) => {
    const newItem = {
      ...item,
      platillosCount: item.platillos.length,
    };
    return { ...r, [`${item.id}-${item.nombre}`]: newItem };
  }, {});
  const categoriesIds = Object.keys(categoriesList);
  return { categoriesList, categoriesIds };
};

const categoriesReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === categoriesActions.types.SET_CATEGORIES) {
    const { categoriesResponse } = payload;
    const { categoriesList, categoriesIds } = formatCategories(categoriesResponse);
    const newState = {
      ...state,
      categoriesList,
      categoriesIds,
    };
    return newState;
  }
  if (type === categoriesActions.types.SET_CATEGORIES_LOADING) {
    const { loading } = action.payload;
    const newState = {
      ...state,
      loading,
    };
    return newState;
  }
  if (type === categoriesActions.types.SET_CATEGORY) {
    const newState = {
      ...state,
      category: { ...payload },
    };
    if (!payload.menus) newState.menus = [];
    return newState;
  }
  if (type === categoriesActions.types.SET_CREATE_MENUS) {
    const newState = { ...state, menus: [...payload] };
    return newState;
  }
  return state;
};

export default categoriesReducer;
