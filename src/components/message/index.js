import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const MessageComponent = ({
  open, type, message, handleClose,
}) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <MuiAlert
      variant="filled"
      elevation={6}
      severity={type}
      onClose={handleClose}
    >
      {message}
    </MuiAlert>
  </Snackbar>
);

MessageComponent.defaultProps = {
  open: false,
  type: 'success',
  message: 'Operacion realizada con éxito',
};

MessageComponent.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export default MessageComponent;
