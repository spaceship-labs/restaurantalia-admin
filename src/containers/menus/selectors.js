const propsSelector = ({ menu, app }) => {
  const { menusList, menusIds } = menu;
  const { loadingProcess } = app;

  const loading = loadingProcess > 0;

  return { menusList, menusIds, loading };
};

const formSelector = ({ menu: menuState, app }) => {
  const { menu, templates } = menuState;
  const { loadingProcess } = app;

  const loading = loadingProcess > 0;

  return { loading, menu, templates };
};

export default { propsSelector, formSelector };
