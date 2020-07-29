const propsSelector = (state) => {
  const {
    auth: { userId },
    app: { loadingProcess, alerts },
  } = state;

  const loading = loadingProcess !== 0;

  return { userId, loading, alerts };
};

export default { propsSelector };
