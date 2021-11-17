import TransactionHeader from "./TransactionHeader";
import TransactionTBody from "./TransactionTBody";

const TransactionTable = ({ data }) => {
  return (
    <table>
      <TransactionHeader
        rowData={data && data.length > 0 && Object.keys(data[0])}
      />
      <TransactionTBody bodydata={data} />
    </table>
  );
};

export default TransactionTable;
