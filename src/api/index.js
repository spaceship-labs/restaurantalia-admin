import axios from 'axios';

const apiBase = 'http://3.130.7.153:1338/';

const getData = async (url, jwt) => axios.get(
  `${apiBase}${url}`, {
    headers: {
      Authorization:
        `Bearer ${jwt}`,
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
