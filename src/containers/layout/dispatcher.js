import { bindActionCreators } from 'redux';
import authActions from '../../actions/auth';
// import authActions from '../../actions/auth';

const mainDispatcher = (dispatch) => {
  const { getUser, logout } = authActions.creators;
  return bindActionCreators(
    {
      getUser,
      logout,
    },
    dispatch,
  );
};

export default { mainDispatcher };
