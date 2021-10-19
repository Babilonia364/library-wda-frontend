import { Backdrop, ButtonBase, CircularProgress, MenuItem, Modal, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getPublishers } from '../apiRoutes/publishers';
import { getUsers } from '../apiRoutes/users';
import { getBooks } from '../apiRoutes/books';

function ModalRegister({ fields, submitFunction, open, handleClose }) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectArray, setSelectArray] = useState([]);
  const [selectArray2, setSelectArray2] = useState([]);
  const [syncro, setSyncro] = useState({});

  useEffect(() => {
    let itemsAux = {};
    fields.map(item => {
      itemsAux[item.property] = "";
      if (item.property === "publisher") {
        getPublishers()
          .then(res => {
            setSelectArray([...res.data]);
          });
      } else if (item.property === "user") {
        getUsers()
          .then(res => {
            setSelectArray([...res.data]);
          });
      } else if (item.property === "book") {
        getBooks()
          .then(res => {
            setSelectArray2([...res.data]);
          });
      }
      return "";
    });
    setItems({ ...itemsAux });
    setLoading(false);
  }, []);

  function _handleSubmit(e) {
    e.preventDefault();
    submitFunction(items, syncro);
  };

  function _handleChange(item, e) {
    let itemAux = items;
    itemAux[item.property] = e.target.value;
    if (item.property === "publisher") {
      let syncroAux = syncro;
      const index = selectArray.findIndex(el => {
        if (el.id === itemAux[item.property])
          return true;
      })
      syncroAux.publisher_name = selectArray[index].publisher_name;
      setSyncro({ ...syncroAux });
    } else if (item.property === "user") {
      let syncroAux = syncro;
      const index = selectArray.findIndex(el => {
        if (el.id === itemAux[item.property])
          return true;
      })
      syncroAux[`${item.property}_name`] = selectArray[index][`${item.property}_name`];
      setSyncro({ ...syncroAux });
    } else if (item.property === "book") {
      let syncroAux = syncro;
      const index = selectArray2.findIndex(el => {
        if (el.id === itemAux[item.property])
          return true;
      })
      syncroAux[`${item.property}_name`] = selectArray2[index][`${item.property}_name`];
      setSyncro({ ...syncroAux });
    }
    setItems({ ...itemAux });
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
          switch (item.property) {
            case "publisher":
            case "user":
              return (
                <Select
                  labelId={item.label}
                  label={item.label}
                  value={items[item.property]}
                  onChange={e => _handleChange(item, e)}
                  key={item.label}
                  className="pb-2 mb-3"
                  displayEmpty
                >
                  <MenuItem value="" disabled>{item.property === "publisher" ? "Editora" : "Usuários"}</MenuItem>
                  {selectArray.map(item2 => {
                    return (
                      <MenuItem
                        value={item2.id}
                        name={item2[`${item.property}_name`]}
                        key={item2[`${item.property}_name`]}
                      >
                        {item2[`${item.property}_name`]}
                      </MenuItem>
                    );
                  })}
                </Select>
              )

            case "book":
              return (
                <Select
                  labelId={item.label}
                  label={item.label}
                  value={items[item.property]}
                  onChange={e => _handleChange(item, e)}
                  key={item.label}
                  className="pb-2 mb-3"
                  displayEmpty
                >
                  <MenuItem value="" disabled>Livros</MenuItem>
                  {selectArray2.map(item2 => {
                    return (
                      <MenuItem value={item2.id} name={item2[`${item.property}_name`]} key={item2[`${item.property}_name`]}>{item2[`${item.property}_name`]}</MenuItem>
                    );
                  })}
                </Select>
              )

            default:
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
          }
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
            onClick={handleClose}
          >
            Cancelar
          </ButtonBase>
        </div>
      </form>
    </Modal>
  );
}

export default ModalRegister;