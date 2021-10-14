import React, { useState, useEffect } from 'react'
import moment from 'moment';
import CustomTable from '../../components/CustomTable';
import getRents from '../../apiRoutes/rents';

function Rents() {
  const [rents, setRents] = useState([]);
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "LIVRO", field: "book_name" },
    { headerName: "USUÁRIO", field: "user_name" },
    { headerName: "DATA DE ALUGUEL", field: "rent_date" },
    { headerName: "DATA DE DEVOLUÇÃO", field: "devolution_date" },
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

  return (
    <CustomTable data={rents} fields={fields} />
  );
}

export default Rents;