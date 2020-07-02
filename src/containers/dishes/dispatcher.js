import { bindActionCreators } from 'redux';
import dishesActions from '../../actions/dishes';

const {
  getDish,
  getCategoriesDishes,
  setDishesLoading,
  createDish,
  updateDish,
} = dishesActions;

export const createDispatcher = (dispatch) => bindActionCreators({
  getDish,
  setDishesLoading,
  createDish,
  updateDish,
}, dispatch);

export const mainDispatcher = (dispatch) => bindActionCreators({
  getCategoriesDishes,
  setDishesLoading,
}, dispatch);
