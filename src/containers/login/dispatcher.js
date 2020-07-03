import { bindActionCreators } from 'redux';

import authActions from '../../actions/auth';

const dispatcher = (dispatch) => {
  const { doLogin } = authActions.creators;

  return bindActionCreators({ doLogin }, dispatch);
};

export default dispatcher;
