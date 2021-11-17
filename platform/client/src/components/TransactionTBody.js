import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TransactionTBody = ({ bodydata }) => {
  return (
    <TableBody>
      {bodydata?.map((columnData) => (
        <TransactionRow columnData={columnData} />
      ))}
    </TableBody>
  );
};

const TransactionRow = ({ columnData }) => {
  return (
    <TableRow>
      {Object.keys(columnData).map(function (key, index) {
        return <TableCell>{columnData[key]}</TableCell>;
      })}
    </TableRow>
  );
};

export default TransactionTBody;
