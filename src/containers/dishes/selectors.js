const propsSelector = ({ dishes, app }) => {
  const { dishesList, dishesIds } = dishes;
  const { loadingProcess } = app;

  const loading = loadingProcess > 0;

  return { dishesList, dishesIds, loading };
};

const createSelector = ({ dishes, app }) => {
  const { dish, categorias } = dishes;
  const { loadingProcess } = app;

  const loading = loadingProcess > 0;

  return { dish, categorias, loading };
};

export default { propsSelector, createSelector };
