import React, { useState, useEffect } from 'react'
import { getUsers, createUsers } from '../../apiRoutes/users';
import CustomTable from '../../components/CustomTable';
import ModalRegister from '../../components/ModalRegister';
import RegisterSearchBar from '../../components/RegisterSearchBar';
import SuccessAlert from '../../components/SuccessAlert';

function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false)
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "NOME", field: "user_name" },
    { headerName: "CIDADE", field: "city" },
    { headerName: "ENDEREÇO", field: "address" },
    { headerName: "EMAIL", field: "email" },
  ];
  const registerFields = [
    { label: "Nome do Usuário", helperText: "", type: "text", property: "user_name" },
    { label: "Cidade do Usuário", helperText: "", type: "text", property: "city" },
    { label: "Endereço do Usuário", helperText: "", type: "text", property: "address" },
    { label: "Email do Usuário", helperText: "", type: "email", property: "email" },
  ];

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers([...res.data])
      }).catch(err => {
        console.error("cannot get users from backend: ", err);
      });
  }, []);

  function handleSubmit(body) {
    createUsers(body)
      .then(res => {
        let userAux = users;
        userAux.push(res.data);
        setUsers([...userAux]);
        handleClose();
        setOpenAlert(true);
      }).catch(err => {
        console.error(err);
      });
  };

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  return (
    <>
      <SuccessAlert open={openAlert} handleClose={() => { setOpenAlert(false) }} />
      <ModalRegister fields={registerFields} submitFunction={handleSubmit} open={open} handleClose={handleClose} />
      <RegisterSearchBar pageTitle="Usuários" buttonText="Cadastrar Usuários" handleClick={handleOpen} />
      <CustomTable data={users} fields={fields} />
    </>
  );
}

export default Users;