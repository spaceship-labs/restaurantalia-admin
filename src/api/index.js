import axios from 'axios';

// const apiBase = 'http://3.130.7.153:1338/';
const apiBase = 'https://restaurantalia-api.spaceshiplabs.com/';

const getData = async (url, jwt) => axios.get(
  `${apiBase}${url}`,
  {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  },
);

const createForm = async (url, jwt, params) => axios.post(
  `${apiBase}${url}`,
  params,
  {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  },
);

export const login = async (user) => {
  const { identifier, password } = user;
  const { data } = await axios.post(`${apiBase}auth/local`, {
    identifier,
    password,
  });
  return data;
};

export const getMenus = async ({ jwt, restaurantIds, page = 1 }) => {
  const limit = page * 30;
  const restaurantes = restaurantIds.reduce((result, r) => (
    `${result}&restaurante=${r}`
  ), '');
  const params = `?_limit=${limit}${restaurantes}`;
  const { data } = await getData(`menus${params}`, jwt);
  return data;
};

export const getMenu = async ({ jwt, id }) => {
  const { data } = await getData(`menus/${id}`, jwt);
  return data;
};

export const getCategories = async ({ jwt, empresasIds }) => {
  const limit = -1;
  const empresas = empresasIds.reduce((result, r) => (
    `${result}&empresa=${r}`
  ), '');
  const params = `?_limit=${limit}${empresas}`;
  const { data } = await getData(`categorias${params}`, jwt);
  return data;
};

export const getDishes = async ({ jwt, empresasIds }) => {
  const limit = -1;
  const empresas = empresasIds.reduce((result, r) => (
    `${result}&empresa_in=${r}`
  ), '');
  const params = `?_limit=${limit}${empresas}`;
  const { data } = await getData(`platillos${params}`, jwt);
  return data;
};

export const getDish = async ({ jwt, dishId }) => {
  const { data } = await getData(`platillos/${dishId}`, jwt);
  return data;
};

export const createDish = async ({ jwt, dish }) => {
  const { data } = await axios.post(
    `${apiBase}platillos`,
    { ...dish },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};

export const updateDish = async ({ jwt, dish }) => {
  const { data } = await axios.put(
    `${apiBase}platillos/${dish.dishId}`,
    { ...dish },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};

export const getCategory = async ({ jwt, catId }) => {
  const { data } = await getData(`categorias/${catId}`, jwt);
  return data;
};

export const createCategory = async ({ jwt, cat }) => {
  const { data } = await axios.post(
    `${apiBase}categorias`,
    { ...cat },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};

export const updateCategory = async ({ jwt, cat }) => {
  const { data } = await axios.put(
    `${apiBase}categorias/${cat.catId}`,
    { ...cat },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};

export const createFiles = async ({ jwt, params }) => {
  const { data } = await createForm('upload', jwt, params);
  return data;
};

export const deleteFile = async ({ jwt, fileId }) => {
  const { data } = await axios.delete(
    `${apiBase}upload/files/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return data;
};
