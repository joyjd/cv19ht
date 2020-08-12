import React from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import { Header } from "./../../../Components/Header/Header.component";
import "./../DisplayAmbulance/DisplayAmbulanceModal.style.scss";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import "./../DisplayCoronaDetails/DisplayCoronaModal.style.scss";

import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1a355c",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#639ab626",
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {},
  root: {
    borderRadius: "205px",
    background: "#e9e2e2",
    boxShadow: "3px 3px 7px #c6c0c0,  -3px -3px 7px #ffffff",
    color: "#1a355c9e",
    margin: "0 5px 2px 0",
  },
});

const DisplayCoronaDetails = (props) => {
  const classes = useStyles();
  return props.c_data != null ? (
    <Dialog fullScreen open={props.open} onClose={props.onclose} aria-labelledby='Display Corona Details' aria-describedby='Display Corona Details'>
      <Header />
      <div className='filterTagsHeader'>View COVID19 Information</div>
      <div className='filterTagsBodyCoronaTable'>
        <div className='SortTitleDesc'>District-wise data of COVID19 pandemic in West Bengal.</div>
        <div className='dividerHolder'>
          <Divider />
        </div>
        <div>
          <TableContainer component={Paper} id='hospitalDetailTable'>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow style={{ backgroundColor: "red", color: "white" }}>
                  <StyledTableCell>District</StyledTableCell>
                  <StyledTableCell align='right'>Infected</StyledTableCell>
                  <StyledTableCell align='right'>Active</StyledTableCell>
                  <StyledTableCell align='right'>Recovered</StyledTableCell>
                  <StyledTableCell align='right'>Dead</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.keys(props.c_data).map((el) => (
                  <StyledTableRow key={el["h_name"]}>
                    <StyledTableCell align='right'>{el}</StyledTableCell>
                    <StyledTableCell align='right'>{props.c_data[el]["confirmed"]}</StyledTableCell>
                    <StyledTableCell align='right'>{props.c_data[el]["active"]}</StyledTableCell>
                    <StyledTableCell align='right'>{props.c_data[el]["recovered"]}</StyledTableCell>
                    <StyledTableCell align='right'>{props.c_data[el]["deceased"]}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className='actionHolder'>
          <Button variant='contained' color='primary' onClick={() => props.onClose()} color='primary'>
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  ) : null;
};

export default DisplayCoronaDetails;
