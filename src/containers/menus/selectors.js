const propsSelector = ({ menus }) => {
  const { menusList, menusIds, loading } = menus;
  return { menusList, menusIds, loading };
};

export default { propsSelector };
