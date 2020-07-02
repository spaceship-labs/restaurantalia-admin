const propsSelector = ({ categories }) => {
  const { categoriesList, categoriesIds, loading } = categories;
  return {
    categoriesList, categoriesIds, loading,
  };
};

export default { propsSelector };
