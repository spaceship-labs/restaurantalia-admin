import axios from 'axios';

const apiBase = 'http://localhost:1337/';

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

export const getMenus = async () => {
  const { data } = await getData('/menus', '');
  return data;
};
