import axios from 'axios';

// const apiBase = 'http://3.130.7.153:1338/';
const apiBase = 'https://restaurantalia-api.spaceshiplabs.com/';

axios.defaults.baseURL = apiBase;

export const setToken = (jwt) => {
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

const get = (url, params = null) => axios.get(url, { ...params });
const post = (url, params = null) => axios.post(url, { ...params });
const put = (url, params = null) => axios.put(url, { ...params });

const getData = async (url) => axios.get(
  `${apiBase}${url}`,
  // {
  //   headers: {
  //     Authorization: `Bearer ${jwt}`,
  //   },
  // },
);

const deleteItem = async (url) => axios.delete(`${apiBase}${url}`);

export const login = async (user) => {
  const { identifier, password } = user;
  const { data } = await post(`${apiBase}auth/local`, { identifier, password });
  return data;
};

export const getMenus = async ({ restaurantIds, page = 1 }) => {
  const limit = page * 30;
  const restaurantes = restaurantIds.reduce((result, r) => (
    `${result}&restaurante=${r}`
  ), '');
  const params = `?_limit=${limit}${restaurantes}`;
  const { data } = await get(`menus${params}`);
  return data;
};

export const getMenu = async ({ id }) => {
  const { data } = await get(`menus/${id}`);
  return data;
};

export const getCategories = async ({ empresasIds }) => {
  const limit = -1;
  const empresas = empresasIds.reduce((result, r) => (
    `${result}&empresa=${r}`
  ), '');
  const params = `?_limit=${limit}${empresas}`;
  const { data } = await getData(`categorias${params}`);
  return data;
};

export const getDishes = async ({ empresasIds }) => {
  const limit = -1;
  const empresas = empresasIds.reduce((result, r) => (
    `${result}&empresa_in=${r}`
  ), '');
  const params = `?_limit=${limit}${empresas}`;
  const { data } = await get(`platillos${params}`);
  return data;
};

export const getDish = async ({ dishId }) => {
  const { data } = await get(`platillos/${dishId}`);
  return data;
};

export const createDish = async ({ dish }) => {
  const { data } = await post(`${apiBase}platillos`, { ...dish });

  return data;
};

export const updateDish = async ({ dish }) => {
  const { data } = await put(`${apiBase}platillos/${dish.dishId}`, { ...dish });

  return data;
};

export const getCategory = async ({ catId }) => {
  const { data } = await get(`categorias/${catId}`);
  return data;
};

export const createCategory = async ({ cat }) => {
  const { data } = await post(`${apiBase}categorias`, { ...cat });

  return data;
};

export const updateCategory = async ({ cat }) => {
  const { data } = await put(`${apiBase}categorias/${cat.catId}`, { ...cat });

  return data;
};

export const deleteDish = async ({ dishId }) => {
  const { data } = await deleteItem(`platillos/${dishId}`);
  return data;
};

export const deleteCategory = async ({ catId }) => {
  const { data } = await deleteItem(`categorias/${catId}`);
  return data;
};
