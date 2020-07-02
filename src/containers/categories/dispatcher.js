import { bindActionCreators } from 'redux';
import categoriesActions from '../../actions/categories';

const {
  getCategory,
  getCategories,
  setCategoriesLoading,
  createCategory,
  updateCategory,
} = categoriesActions;

export const createDispatcher = (dispatch) => bindActionCreators({
  getCategory,
  setCategoriesLoading,
  createCategory,
  updateCategory,
}, dispatch);

export const mainDispatcher = (dispatch) => bindActionCreators({
  getCategories,
  setCategoriesLoading,
}, dispatch);