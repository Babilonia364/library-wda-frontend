import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { createBook, getBooks } from '../../apiRoutes/books';
import CustomTable from '../../components/CustomTable';
import RegisterSearchBar from '../../components/RegisterSearchBar';
import ModalRegister from '../../components/ModalRegister';
import SuccessAlert from '../../components/SuccessAlert';

function Books() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "NOME", field: "book_name" },
    { headerName: "AUTOR", field: "author" },
    { headerName: "LANÇAMENTO", field: "release" },
    { headerName: "EDITORA", field: "publisher_name" },
  ];
  const registerFields = [
    { label: "Nome do Livro", helperText: "", type: "text", property: "book_name" },
    { label: "Autor do Livro", helperText: "", type: "text", property: "author" },
    { label: "Data de Lançamento", helperText: "", type: "date", property: "release" },
    { label: "Editora", helperText: "", type: "text", property: "publisher" },
  ];

  useEffect(() => {
    getBooks()
      .then(res => {
        res.data.map(item => {
          item.release = moment(item.release, 'YYYY-MM-DD').format('YYYY');
          return null;
        })
        setBooks([...res.data]);
      });
  }, []);

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  function handleSubmit(body, syncro) {
    createBook(body)
      .then(res => {
        let bookAux = books;
        let resAux = res.data
        resAux.publisher_name = syncro.publisher_name;
        bookAux.push(resAux);
        setBooks([...bookAux]);
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
      <RegisterSearchBar pageTitle="Livros" buttonText="Cadastrar Livro" handleClick={handleOpen} />
      <CustomTable data={books} fields={fields} />
    </>
  );
}

export default Books;