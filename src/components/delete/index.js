import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteSectionComponent = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);
  const handleDelete = () => {
    toggleDialog();
    onDelete();
  };
  return (
    <>
      <Alert
        severity="error"
        action={(
          <Button
            onClick={toggleDialog}
            variant="contained"
            color="secondary"
            size="small"
          >
            BORRAR ELEMENTO
          </Button>
        )}
      >
        Esta acción no se puede deshacer.
      </Alert>
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Elimitar este elemento
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estas seguro que quieres borrar este elemento?
            Recuerda que esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteSectionComponent.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteSectionComponent;
