import { bindActionCreators } from 'redux';
import dishesActions from '../../actions/dishes';

const {
  getDish,
  getCategoriesDishes,
  setDishesLoading,
  createDish,
  updateDish,
  initForm,
  uploadDishImage,
  deleteDishImage,
  deleteDish,
} = dishesActions.creators;

export const createDispatcher = (dispatch) => bindActionCreators({
  getDish,
  setDishesLoading,
  createDish,
  updateDish,
  initForm,
  uploadDishImage,
  deleteDishImage,
  deleteDish,
}, dispatch);

export const mainDispatcher = (dispatch) => bindActionCreators({
  getCategoriesDishes,
  setDishesLoading,
}, dispatch);
