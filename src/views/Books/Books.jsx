import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { getBooks } from '../../apiRoutes/books';
import CustomTable from '../../components/CustomTable';

function Books() {
  const [books, setBooks] = useState([]);
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "NOME", field: "book_name" },
    { headerName: "AUTOR", field: "author" },
    { headerName: "LANÇAMENTO", field: "release" },
    { headerName: "EDITORA", field: "publisher_name" },
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

  return (
    <CustomTable data={books} fields={fields} />
  );
}

export default Books;