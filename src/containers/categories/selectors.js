const propsSelector = ({ categories }) => {
  const { categoriesList, categoriesIds } = categories;
  return { categoriesList, categoriesIds };
};

const createSelector = ({ categories, app }) => {
  const { category, menus } = categories;
  const { loadingProcess } = app;

  const loading = loadingProcess > 0;

  return { category, menus, loading };
};

export default { createSelector, propsSelector };
