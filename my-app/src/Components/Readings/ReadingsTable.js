import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Grid, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function ReadingsTable(props) {
  const [ReadingsData, setReadingsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/readings?Id=${props.Id}`)
      .then(response => {
        setReadingsData(response.data);
      })
      .catch(error => console.log(error));
  }, [props.Id]);

  const columns = [
    { id: 'DeviceName', label: 'Device Name', align: 'center' },
    { id: 'Time', label: 'Date', align: 'center' },
  ];

  ReadingsData.forEach((row) => {
    const parameterWithUnit = `${row.Parameter} (${row.Unit})`;
    if (!columns.find(col => col.id === parameterWithUnit)) {
      columns.push({ id: parameterWithUnit, label: parameterWithUnit, align: 'center' });
    }
  });

  const formatDataForTable = () => {
    const formattedData = {};

    ReadingsData.forEach((row) => {
      if (!formattedData[row.Time]) {
        formattedData[row.Time] = {
          DeviceName: row.DeviceName,
          Time: new Date(row.Time).toLocaleDateString(),
          ProjectName: row.ProjectName,
        };
      }
      formattedData[row.Time][`${row.Parameter} (${row.Unit})`] = row.Reading;
    });

    return Object.values(formattedData);
  };

  const tableData = formatDataForTable();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Grid spacing={40} container>
        <Grid item md={11}>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8, marginBottom: 8 }}>
            <h1 style={{ flex: 1 }}>Existing Readings</h1>
            {tableData[0] && <h1 style={{ flex: 1, textAlign: 'right' }}>{tableData[0].ProjectName}</h1>}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} align="center">
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      {columns.map((column) => (
                        <StyledTableCell key={column.id} align="center">
                          {row[column.id] || "-"}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{ overflow: "unset" }} // <-- Added to remove scroll
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{
                // <-- Added to move TablePagination to the right bottom end
                display: "flex",
                alignContent: "flex-end",
                padding: "12px",
              }}
            />
          </TableContainer>


        </Grid>
      </Grid>
    </div>
  );
}

export default ReadingsTable;

