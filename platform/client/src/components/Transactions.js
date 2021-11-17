import TransactionTable from "./TransactionTable";
import data from "../data/data";
const Transactions = () => {
  return (
    <div>
      <h2>Transactions</h2>
      <TransactionTable data={data} />
    </div>
  );
};

export default Transactions;
