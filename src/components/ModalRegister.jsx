import { ButtonBase, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react'

function ModalRegister({ fields }) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div
        className="bg-white container-fluid col-10 d-flex flex-column justify-content-center rounded py-4"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {fields.map(item => {
          return (
            <TextField
              id="outlined-basic"
              className="pb-2"
              label={item.label}
              helperText={item.helperText}
              key={item.label}
            />
          );
        })}
        <div className="d-flex flex-row">
          <ButtonBase className="bg-success text-white shadow rounded py-2 col-4 me-2">Cadastrar</ButtonBase>
          <ButtonBase className="bg-danger text-white shadow rounded py-2 col-4">Cancelar</ButtonBase>
        </div>
      </div>
    </Modal>
  );
}

export default ModalRegister;