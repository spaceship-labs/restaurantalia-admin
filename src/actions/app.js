const prefix = '@restaurantalia/admin/app/';

const NEW_LOADING_PROCESS = `${prefix}NEW_LOADING_PROCESS`;
const END_LOADING_PROCESS = `${prefix}END_LOADING_PROCESS`;
const SET_LOADING = `${prefix}SET_LOADING`;

const newLoading = (payload = {}) => ({ type: NEW_LOADING_PROCESS, payload });
const endLoading = (payload = {}) => ({ type: END_LOADING_PROCESS, payload });
const setLoading = (payload = {}) => ({ type: SET_LOADING, payload });

export default {
  types: {
    NEW_LOADING_PROCESS,
    END_LOADING_PROCESS,
    SET_LOADING,
  },
  creators: {
    newLoading,
    endLoading,
    setLoading,
  },
};
