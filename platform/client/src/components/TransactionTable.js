import TransactionHeader from "./TransactionHeader";
import TransactionTBody from "./TransactionTBody";
import Table from "@mui/material/Table";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const TransactionTable = ({ data }) => {
  return (
    <Table size="small">
      <TransactionHeader
        rowData={data && data.length > 0 && Object.keys(data[0])}
      />
      <TransactionTBody bodydata={data} />
    </Table>
  );
};

export default TransactionTable;
