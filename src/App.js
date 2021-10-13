import './App.css';
import { useEffect, useState } from 'react';
import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { getUsers } from './apiRoutes/users';
import { Create, Delete } from '@material-ui/icons';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then(res => {
        console.log("users: ", res.data);
        setUsers([...res.data])
      }).catch(err => {
        console.log("cannot get users from backend: ", err);
      });
  }, [])

  return (
    <>
      <CssBaseline />
      <Typography variant="h4" component="div">Usuários</Typography>
      <TableContainer componen={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOME</TableCell>
              <TableCell>CIDADE</TableCell>
              <TableCell>ENDEREÇO</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={`${user.id}user`}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Create />
                  <Delete />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
