const TransactionHeader = ({ rowData }) => {
  console.log(rowData);
  return (
    <thead>
      <tr>
        {rowData?.map((column) => (
          <th>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TransactionHeader;
