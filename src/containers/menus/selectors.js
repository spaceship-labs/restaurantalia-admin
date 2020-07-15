const propsSelector = ({ menus }) => {
  const { menusList, menusIds, loading } = menus;
  return { menusList, menusIds, loading };
};

const formSelector = ({ menu: menuState }) => {
  const { loading, menu, templates } = menuState;
  return { loading, menu, templates };
};

export default { propsSelector, formSelector };
