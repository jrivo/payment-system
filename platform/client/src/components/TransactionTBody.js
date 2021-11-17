const TransactionTBody = ({ bodydata }) => {
  return (
    <tbody>
      {bodydata?.map((columnData) => (
        <TransactionRow columnData={columnData} />
      ))}
    </tbody>
  );
};

const TransactionRow = ({ columnData }) => {
  return (
    <tr>
      {/* {columnData?.map((column) => (
        <td>{column}</td>
      ))} */}

      {Object.keys(columnData).map(function (key, index) {
        return <td>{columnData[key]}</td>;
      })}
    </tr>
  );
};

export default TransactionTBody;
