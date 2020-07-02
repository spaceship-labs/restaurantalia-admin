const propsSelector = ({ dishes }) => {
  const { dishesList, dishesIds, loading } = dishes;
  return { dishesList, dishesIds, loading };
};

export default { propsSelector };
