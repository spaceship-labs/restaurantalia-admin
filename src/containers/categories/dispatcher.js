import { bindActionCreators } from 'redux';
import categoriesActions from '../../actions/categories';

const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  initForm,
  uploadCategoryImage,
  deleteCategoryImage,
  deleteCategory,
} = categoriesActions.creators;

export const createDispatcher = (dispatch) => bindActionCreators({
  getCategory,
  createCategory,
  updateCategory,
  initForm,
  uploadCategoryImage,
  deleteCategoryImage,
  deleteCategory,
}, dispatch);

export const mainDispatcher = (dispatch) => bindActionCreators({
  getCategories,
}, dispatch);
