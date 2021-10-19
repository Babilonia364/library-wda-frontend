import React, { useState, useEffect } from 'react'
import moment from 'moment';
import CustomTable from '../../components/CustomTable';
import { getRents, createRent } from '../../apiRoutes/rents';
import RegisterSearchBar from '../../components/RegisterSearchBar';
import ModalRegister from '../../components/ModalRegister';
import SuccessAlert from '../../components/SuccessAlert';

function Rents() {
  const [rents, setRents] = useState([]);
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "LIVRO", field: "book_name" },
    { headerName: "USUÁRIO", field: "user_name" },
    { headerName: "DATA DE ALUGUEL", field: "rent_date" },
    { headerName: "DATA DE DEVOLUÇÃO", field: "devolution_date" },
  ];
  const registerFields = [
    { label: "Nome do Livro", helperText: "", type: "text", property: "book" },
    { label: "Nome do usuário", helperText: "", type: "text", property: "user" },
    { label: "Data de Aluguél", helperText: "", type: "date", property: "rent_date" },
    { label: "Data de Devolução", helperText: "", type: "date", property: "devolution_date" },
  ];

  useEffect(() => {
    getRents()
      .then(res => {
        res.data.map(item => {
          item.rent_date = moment(item.rent_date, 'YYYY-MM-DD HH:MM:SS').format('DD/MM/YYYY');
          item.devolution_date = moment(item.devolution_date, 'YYYY-MM-DD HH:MM:SS').format('DD/MM/YYYY');
          return null;
        })
        setRents([...res.data]);
      });
  }, []);

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  function handleSubmit(body) {
    console.log("body: ", body);
    createRent(body)
      .then(res => {
        let rentAux = rents;
        rentAux.push(res.data);
        setRents([...rentAux]);
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
      <RegisterSearchBar pageTitle="Aluguéis" buttonText="Cadastrar Aluguél" handleClick={handleOpen} />
      <CustomTable data={rents} fields={fields} />
    </>
  );
}

export default Rents;