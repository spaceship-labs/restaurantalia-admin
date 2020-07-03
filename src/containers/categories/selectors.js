const propsSelector = ({ categories }) => {
  const { categoriesList, categoriesIds, loading } = categories;
  return {
    categoriesList, categoriesIds, loading,
  };
};

const createSelector = ({
  categories: {
    loading,
    category,
    menus,
  },
}) => ({
  loading,
  category,
  menus,
});

export default { createSelector, propsSelector };
