import './tableRow.css'

function TableRow(props) {
  const data = props.user;
  return (
    <>
      <tr>
        <td>{data.FirstName}</td>
        <td>{data.LastName}</td>
        <td>{data.Email}</td>
        <td>{data.Designation}</td>
        <td>{data.Country}</td>
        <td>{data.Site}</td>
      </tr>
    </>
  );
}

export default TableRow;

