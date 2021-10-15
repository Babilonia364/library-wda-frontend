import React, { useState, useEffect } from 'react'
import { createPublisher, getPublishers } from '../../apiRoutes/publishers';
import CustomTable from '../../components/CustomTable';
import ModalRegister from '../../components/ModalRegister';
import RegisterSearchBar from '../../components/RegisterSearchBar';
import SuccessAlert from '../../components/SuccessAlert';

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "NOME", field: "publisher_name" },
    { headerName: "CIDADE", field: "city" },
  ];
  const registerFields = [
    { label: "Nome da Editora", helperText: "", type: "text", property: "publisher_name" },
    { label: "Cidade da Editora", helperText: "", type: "text", property: "city" },
  ];

  useEffect(() => {
    getPublishers()
      .then(res => {
        setPublishers([...res.data]);
      }).catch(err => {
        console.error("cannot get publishers from database: ", err);
      })
  }, []);

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  function handleSubmit(body) {
    createPublisher(body)
      .then(res => {
        let publisherAux = publishers;
        publisherAux.push(res.data);
        setPublishers([...publisherAux]);
        handleClose();
        setOpenAlert(true);
      }).catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <SuccessAlert open={openAlert} handleClose={() => { setOpenAlert(false) }} />
      <ModalRegister fields={registerFields} submitFunction={handleSubmit} open={open} handleClose={handleClose} />
      <RegisterSearchBar pageTitle="Editoras" buttonText="Cadastrar Editora" handleClick={handleOpen} />
      <CustomTable data={publishers} fields={fields} />
    </>
  );
}

export default Publishers;