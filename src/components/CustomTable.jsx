import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';

function CustomTable({ data, fields }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead className="bg-primary">
          <TableRow>
            {fields.map(field => (
              <TableCell key={field.headerName} className="text-white">{field.headerName}</TableCell>
            ))}
            <TableCell className="text-white">AÇÕES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(dataCell => (
            <TableRow key={`${dataCell.id}user`}>
              {fields.map((item, index) => (
                <TableCell key={`${index}cell`}>{dataCell[item.field]}</TableCell>
              ))}
              <TableCell>
                <Create />
                <Delete />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;