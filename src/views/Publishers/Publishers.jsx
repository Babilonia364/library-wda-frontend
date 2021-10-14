import React, { useState, useEffect } from 'react'
import { getPublishers } from '../../apiRoutes/publishers';
import CustomTable from '../../components/CustomTable';

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const fields = [
    { headerName: "ID", field: "id" },
    { headerName: "NOME", field: "publisher_name" },
    { headerName: "CIDADE", field: "city" },
  ];

  useEffect(() => {
    getPublishers()
      .then(res => {
        setPublishers([...res.data]);
      }).catch(err => {
        console.error("cannot get publishers from database: ", err);
      })
  }, []);

  return (
    <CustomTable data={publishers} fields={fields} />
  );
}

export default Publishers;