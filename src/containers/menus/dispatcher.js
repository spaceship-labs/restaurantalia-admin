import { bindActionCreators } from 'redux';
import menusActions from '../../actions/menus';

const {
  initMenuForm,
  getMenus,
  setMenuLoading,
  getMenu,
  updateMenu,
  deleteMenuImage,
  uploadImages,
} = menusActions.creators;

export const formDispatcher = (dispatch) => bindActionCreators({
  initMenuForm,
  setMenuLoading,
  getMenu,
  updateMenu,
  deleteMenuImage,
  uploadImages,
}, dispatch);

export const mainDispatcher = (dispatch) => bindActionCreators({
  getMenus,
}, dispatch);
