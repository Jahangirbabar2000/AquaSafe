import './tableRow.css'

function TableRow(props) {
  const data = props.user;
  return (
    <>
      <tr>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.email}</td>
        <td>{data.designation}</td>
        <td>{data.country}</td>
        <td>{data.site}</td>
      </tr>
    </>
  );
}

export default TableRow;

