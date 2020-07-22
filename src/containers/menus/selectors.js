const propsSelector = ({ menu }) => {
  const { menusList, menusIds, loading } = menu;
  return { menusList, menusIds, loading };
};

const formSelector = ({ menu: menuState }) => {
  const { loading, menu, templates } = menuState;
  return { loading, menu, templates };
};

export default { propsSelector, formSelector };
