const propsSelector = (state) => {
  const {
    auth: { userId },
    app: { loadingProcess },
  } = state;

  const loading = loadingProcess !== 0;

  return { userId, loading };
};

export default { propsSelector };
