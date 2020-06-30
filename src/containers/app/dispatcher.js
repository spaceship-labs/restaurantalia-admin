import { bindActionCreators } from 'redux';
import authActions from '../../actions/auth';

const dispatcher = (dispatch) => {
  const { getUser } = authActions.creators;
  return bindActionCreators({ getUser }, dispatch);
};

export default dispatcher;
