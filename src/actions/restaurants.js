const prefix = '@restaurantalia/admin/restaurantes/';

const SET_RESTAURANTES = `${prefix}SET_RESTAURANTES`;

// TODO: Maybe move away loading
const SET_LOADING = `${prefix}SET_LOADING`;

const setLoading = (payload = {}) => ({ type: SET_LOADING, payload });
const setRestaurantes = (payload = {}) => ({ type: SET_RESTAURANTES, payload });

export default {
  types: {
    SET_LOADING,
    SET_RESTAURANTES,
  },
  creators: {
    setLoading,
    setRestaurantes,
  },
};
