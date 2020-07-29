import { bindActionCreators } from 'redux';
import authActions from '../../actions/auth';
import appActions from '../../actions/app';

const mainDispatcher = (dispatch) => {
  const { getUser, logout } = authActions.creators;
  const { dismissAlert } = appActions.creators;
  return bindActionCreators(
    {
      getUser,
      logout,
      dismissAlert,
    },
    dispatch,
  );
};

export default { mainDispatcher };
