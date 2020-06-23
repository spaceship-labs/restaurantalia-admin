/* eslint-disable no-undef */

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('restaurantalia');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('restaurantalia', serializedState);
  } catch (err) {
    // die
  }
};

export const clearState = () => {
  try {
    localStorage.setItem('restaurantalia', '');
  } catch (err) {
    // die
  }
};
