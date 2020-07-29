import { bindActionCreators } from 'redux';
import authActions from '../../actions/auth';

const mainDispatcher = (dispatch) => {
  const { getUser, logout, dismissAlert } = authActions.creators;
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
