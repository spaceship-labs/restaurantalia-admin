const menusList = [
  {
    id: 1,
    slug: '1',
    nombre: 'Item #1',
    precio: '120.5',
    activo: true,
    padre: 'Im your father',
  },
  {
    id: 2,
    slug: '2',
    nombre: 'Item #2',
    precio: '151.5',
    activo: true,
    padre: 'Im your father',
  },
  {
    id: 3,
    slug: '3',
    nombre: 'Item #3',
    precio: '1220',
    activo: false,
    padre: 'Im your father',
  },
];
const locaData = {
  userId: 2,
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyOTU5NTEzLCJleHAiOjE1OTU1NTE1MTN9.cE2AyFTwSpY359ip-Z4vS--vAFfdE0xBoPnZ5lK1Ras',
  user: {
    id: 2,
    username: 'RoosterTest',
    email: 'roostertest@restaurantalia.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    role: {
      id: 4,
      name: 'Admin',
      description: 'Usuarios que pueden iniciar sesion para administrar su contenido',
      type: 'admin',
    },
    created_at: '2020-06-23T17:51:37.000Z',
    updated_at: '2020-06-23T17:51:37.000Z',
    empresas: [{
      id: 1, nombre: 'Rooster Mexico', contacto_nombre: null, contacto_email: null, contacto_telefono: null, direccion: null, created_at: '2020-06-23T17:49:00.000Z', updated_at: '2020-06-23T17:49:00.000Z',
    }],
    restaurantes: [{
      id: 1, nombre: 'Rooster', slug: 'rooster', direccion: null, telefono: null, created_at: '2020-06-23T17:52:14.000Z', updated_at: '2020-06-23T17:52:14.000Z',
    }],
  },
};

export {
  menusList,
  locaData,
};
