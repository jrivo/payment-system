import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const TransactionHeader = ({ rowData }) => {
  console.log(rowData);
  return (
    <TableHead>
      <TableRow>
        {rowData?.map((column) => (
          <TableCell>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TransactionHeader;
