import { bindActionCreators } from 'redux';
import categoriesActions from '../../actions/categories';

const {
  getCategory,
  getCategories,
  setCategoriesLoading,
  createCategory,
  updateCategory,
  initForm,
} = categoriesActions.creators;

export const createDispatcher = (dispatch) => bindActionCreators({
  getCategory,
  setCategoriesLoading,
  createCategory,
  updateCategory,
  initForm,
}, dispatch);

export const mainDispatcher = (dispatch) => bindActionCreators({
  getCategories,
  setCategoriesLoading,
}, dispatch);
