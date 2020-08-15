import React from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

import FindInPageIcon from "@material-ui/icons/FindInPage";
import "./../HospitalItem/HospitalItem.style.scss";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import * as geolib from "geolib";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

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
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const HospitalItem = (props) => {
  const classes = useStyles();

  return props.userCords !== null ? (
    <TableContainer component={Paper} id='hospitalDetailTable'>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow style={{ backgroundColor: "red", color: "white" }}>
            <StyledTableCell>Covid19 Hospital({props.selectedHospitalList.length})</StyledTableCell>
            <StyledTableCell align='right'>Area</StyledTableCell>
            <StyledTableCell align='right'>Vacant Beds*</StyledTableCell>
            <StyledTableCell align='right'></StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.selectedHospitalList.map((el) => (
            <StyledTableRow key={el["h_name"]}>
              <StyledTableCell component='th' scope='row'>
                <div style={{ textDecoration: "underline" }} onClick={() => props.onClick(el["h_name"], el["h_zone"], el["c_bed"], el["h_dist"])}>
                  <strong> {el["h_name"]}</strong>
                </div>
                <div className='distanceIndicator'>
                  {el["h_loc"] !== "" ? (
                    <span className='distanceData'>
                      <DirectionsRunIcon />
                    </span>
                  ) : (
                    <span className='errorData'>
                      <PriorityHighIcon />
                    </span>
                  )}
                  <span>{el["h_loc"] !== "" ? (el["h_dist"] = formatter.format(geolib.getPreciseDistance({ latitude: props.userCords[0], longitude: props.userCords[1] }, { latitude: el["h_loc"]["lat"], longitude: el["h_loc"]["lng"] }) / 1000)) : ""}</span>
                  {el["h_loc"] !== "" ? <span>Km away*</span> : <span>Data not known</span>}
                </div>
              </StyledTableCell>
              <StyledTableCell align='right'>{el["h_zone"]}</StyledTableCell>
              <StyledTableCell align='right'>
                <div className='displayFlex'>
                  {el["c_bed"] > 2 ? (
                    <div className='icon-green'>
                      <i></i>
                    </div>
                  ) : (
                    <div className='icon-orange'>
                      <i></i>
                    </div>
                  )}

                  <strong>{el["c_bed"]}</strong>
                </div>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Fab classes={{ root: classes.root }} size='small' color='primary' aria-label='add' onClick={() => props.onClick(el["h_name"], el["h_zone"], el["c_bed"], el["h_dist"])}>
                  <FindInPageIcon fontSize='small' />
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {props.selectedHospitalList.length === 0 ? <div className='noResultFoundcontainer'>No hospitals found.</div> : <span></span>}
    </TableContainer>
  ) : null;
};
const mapStateToProps = (state) => ({
  userCords: state.userCords.userCords,
  selectedHospitalList: state.selectedHospitalList.selectedHospital,
});
export default connect(mapStateToProps)(HospitalItem);
