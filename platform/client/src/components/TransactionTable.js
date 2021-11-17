import TransactionHeader from "./TransactionHeader";
import TransactionTBody from "./TransactionTBody";
import Table from "@mui/material/Table";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const TransactionTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TransactionHeader
          rowData={data && data.length > 0 && Object.keys(data[0])}
        />
        <TransactionTBody bodydata={data} />
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
