import dishesActions from '../actions/dishes';

const initalState = {
  dishesList: {},
  dish: {
    nombre: '',
    orden: '1',
    precio: '0',
    cantidad: '',
    descripcion: '',
    categorias: [],
  },
  dishesIds: [],
  categories: [],
  loading: false,
};

const formatDishes = (data) => {
  const dishesList = data.reduce((r, item) => (
    { ...r, [`${item.id}-${item.nombre}`]: item }
  ), {});
  const dishesIds = Object.keys(dishesList);
  return { dishesList, dishesIds };
};

const categoriesReducer = (state = initalState, action) => {
  const { type, payload } = action;
  if (type === dishesActions.types.SET_DISHES) {
    const { dishesResponse } = payload;
    const { dishesList, dishesIds } = formatDishes(dishesResponse);
    const newState = {
      ...state,
      dishesList,
      dishesIds,
    };

    return newState;
  }
  if (type === dishesActions.types.SET_DISHES_LOADING) {
    const { loading } = action.payload;
    const newState = {
      ...state,
      loading,
    };
    return newState;
  }

  if (type === dishesActions.types.SET_DISH) {
    const newState = {
      ...state,
      dish: { ...payload },
    };
    if (!payload.categorias) newState.categorias = [];
    return newState;
  }

  if (type === dishesActions.types.SET_CREATE_CATEGORIES) {
    const newState = { ...state, categories: [...payload] };
    return newState;
  }

  return state;
};

export default categoriesReducer;
