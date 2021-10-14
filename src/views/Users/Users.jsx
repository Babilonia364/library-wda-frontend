import React, { useState, useEffect } from 'react'
import { getUsers } from '../../apiRoutes/users';
import CustomTable from '../../components/CustomTable';
import ModalRegister from '../../components/ModalRegister';
import RegisterSearchBar from '../../components/RegisterSearchBar';

function Users() {
  const [users, setUsers] = useState([]);
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "NOME", field: "user_name" },
    { headerName: "CIDADE", field: "city" },
    { headerName: "ENDEREÇO", field: "address" },
    { headerName: "EMAIL", field: "email" },
  ];
  const registerFields = [
    { label: "Nome do Usuário", helperText: "" },
    { label: "Cidade do Usuário", helperText: "" },
    { label: "Endereço do Usuário", helperText: "" },
    { label: "Email do Usuário", helperText: "" },
  ];

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers([...res.data])
      }).catch(err => {
        console.error("cannot get users from backend: ", err);
      });
  }, [])

  return (
    <>
      <ModalRegister fields={registerFields} />
      <RegisterSearchBar pageTitle="Usuários" buttonText="Cadastrar Usuários" handleClick={() => { }} />
      <CustomTable data={users} fields={fields} />
    </>
  );
}

export default Users;