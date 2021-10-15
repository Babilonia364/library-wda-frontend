import { Backdrop, ButtonBase, CircularProgress, Modal, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

function ModalRegister({ fields, submitFunction, open, handleClose }) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let itemsAux = {};
    fields.map(item => {
      itemsAux[item.property] = "";
    });
    setItems({...itemsAux});
    setLoading(false);
  }, []);
  
  function _handleSubmit(e) {
    e.preventDefault();
    submitFunction(items);
  };

  function _handleChange(item, e) {
    let itemAux = items;
    itemAux[item.property] = e.target.value;
    setItems({...itemAux});
  };

  function _getInputProps(type) {
    return type === "date" ? { shrink: true } : {};
  };

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <form
        className="bg-white container-fluid col-10 d-flex flex-column justify-content-center rounded py-4"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        onSubmit={_handleSubmit}
      >
        {fields.map(item => {
          return (
            <TextField
              id="outlined-basic"
              type={item.type}
              className="pb-2 mb-1"
              value={items[item.property]}
              onChange={e => _handleChange(item, e)}
              label={item.label}
              helperText={item.helperText}
              key={item.label}
              InputLabelProps={_getInputProps(item.type)}
              required
            />
          );
        })}
        <div className="d-flex flex-row">
          <ButtonBase
            className="bg-success text-white shadow rounded py-2 col-4 me-2"
            type="submit"
          >
            Cadastrar
          </ButtonBase>
          <ButtonBase
            className="bg-danger text-white shadow rounded py-2 col-4"
          >
            Cancelar
          </ButtonBase>
        </div>
      </form>
    </Modal>
  );
}

export default ModalRegister;