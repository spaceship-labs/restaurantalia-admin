const propsSelector = ({ dishes }) => {
  const { dishesList, dishesIds, loading } = dishes;
  return { dishesList, dishesIds, loading };
};

const createSelector = ({
  dishes: {
    loading,
    dish,
    categories: categorias,
  },
}) => ({
  loading,
  dish,
  categorias,
});

export default { propsSelector, createSelector };
