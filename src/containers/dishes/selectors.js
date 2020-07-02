const propsSelector = ({ dishes }) => {
  const { dishesList, dishesIds, loading } = dishes;
  return { dishesList, dishesIds, loading };
};

const createSelector = ({ dishes: { loading, dish } }) => ({ loading, dish });

export default { propsSelector, createSelector };
