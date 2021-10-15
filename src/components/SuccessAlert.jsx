import React from 'react'
import { Alert, AlertTitle, Snackbar } from '@material-ui/core';

function SuccessAlert({ open, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
        <AlertTitle>Sucesso</AlertTitle>
        Usuário Criado com sucesso
      </Alert>
    </Snackbar>
  );
}

export default SuccessAlert;