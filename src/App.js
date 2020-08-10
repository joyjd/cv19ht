import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";

import { Header } from "./Components/Header/Header.component";
import Location from "./Components/Location/Location.component";
import Hospital from "./Components/Hospital/Hospital.component";

import { CommunicatorFetch } from "./Utils/Communicator/Communicator.component";
import ApiUrls from "./Utils/ApiUrls.data";

import { ErrorModal } from "./Modals/ErrorModal/ErrorModal.component";
import WelcomeModal from "./Modals/WelcomeModal/WelcomeModal.component";

import { setTotalHospitalDetails } from "./redux/totalHospitalDetails/totalHospital.action";
import { setAddressComponents } from "./redux/userAddress/addressComponents.action";
import { setFormattedAddress } from "./redux/userAddress/formattedAddress.action";
import { setUserCords } from "./redux/userAddress/userCords.action";
import { setRawHospitalData } from "./redux/totalHospitalDetails/rawHospitalData.action";

import { dummyLoc } from "./assets/dummyLoc";

const env = "dev"; // prod -  dev
class App extends React.Component {
  errorBodyMessage = "";
  hospitalList = [];
  loc_locationCoordinates_lat = null;
  loc_locationCoordinates_long = null;

  constructor() {
    super();
    this.state = {
      openWelcomeAlert: false,
      viewErrorModal: false,
      openBackDrop: false,
    };
  }

  componentDidMount() {
    // setInterval(() => this.props.setSelectedlList(["a", "b"]), 4000);
    //  this.props.setSelectedlList(["a", "b"]);
    console.log("App mounted");
    this.setState(
      {
        openWelcomeAlert: true,
      },
      () => this.prepareHospitalData()
    );
  }

  componentDidUpdate() {
    console.log("App updated");
    console.log(this.state);
  }
  /* shouldComponentUpdate(nextProps, nextState) {
    // return true;
    // console.log("shouldComponentUpdate executed");
    return this.state != nextState.value;
  } */

  prepareHospitalData = () => {
    CommunicatorFetch(ApiUrls.getHospitalCodes)
      .then((data) => {
        let tempArr = data.filter((elem) => Object.keys(elem).length >= 4).filter((el) => el["vacant"] != 0 && typeof el["vacant"] !== "string");
        this.hospitalList = Object.assign([], tempArr);
      })
      .then(() => CommunicatorFetch(ApiUrls.getHospitalDetails))
      .then((data) => {
        this.arrangeHospitalKeyMap(data);
      });
  };

  arrangeHospitalKeyMap(data) {
    let hospitalDetailsData = data;
    let tempDup = {};
    let tempMap = {};
    for (let i = 0, j = this.hospitalList.length - 1; i <= this.hospitalList.length / 2, j >= this.hospitalList.length / 2; i++, j--) {
      if (tempMap[this.hospitalList[i]["district"]]) {
        if (tempMap[this.hospitalList[i]["district"]].find((el) => el["name"] == this.hospitalList[i]["name"]) == undefined) {
          tempMap[this.hospitalList[i]["district"]].push({
            h_name: this.hospitalList[i]["name"],
            c_bed: this.hospitalList[i]["vacant"],
            h_zone: this.hospitalList[i]["district"],
            h_loc: hospitalDetailsData[this.hospitalList[i]["name"]] ? (hospitalDetailsData[this.hospitalList[i]["name"]]["geometry"] ? hospitalDetailsData[this.hospitalList[i]["name"]]["geometry"]["location"] : "") : "",
            h_dist: "",
          });
        }
      } else {
        tempMap[this.hospitalList[i]["district"]] = [
          {
            h_name: this.hospitalList[i]["name"],
            c_bed: this.hospitalList[i]["vacant"],
            h_zone: this.hospitalList[i]["district"],
            h_loc: hospitalDetailsData[this.hospitalList[i]["name"]] ? (hospitalDetailsData[this.hospitalList[i]["name"]]["geometry"] ? hospitalDetailsData[this.hospitalList[i]["name"]]["geometry"]["location"] : "") : "",
            h_dist: "",
          },
        ];
      }

      if (tempMap[this.hospitalList[j]["district"]]) {
        if (tempMap[this.hospitalList[j]["district"]].find((el) => el["name"] == this.hospitalList[j]["name"]) == undefined) {
          tempMap[this.hospitalList[j]["district"]].push({
            h_name: this.hospitalList[j]["name"],
            c_bed: this.hospitalList[j]["vacant"],
            h_zone: this.hospitalList[j]["district"],
            h_loc: hospitalDetailsData[this.hospitalList[j]["name"]] ? (hospitalDetailsData[this.hospitalList[j]["name"]]["geometry"] ? hospitalDetailsData[this.hospitalList[j]["name"]]["geometry"]["location"] : "") : "",
            h_dist: "",
          });
        }
      } else {
        tempMap[this.hospitalList[j]["district"]] = [
          {
            h_name: this.hospitalList[j]["name"],
            c_bed: this.hospitalList[j]["vacant"],
            h_zone: this.hospitalList[j]["district"],
            h_loc: hospitalDetailsData[this.hospitalList[j]["name"]] ? (hospitalDetailsData[this.hospitalList[j]["name"]]["geometry"] ? hospitalDetailsData[this.hospitalList[j]["name"]]["geometry"]["location"] : "") : "",
            h_dist: "",
          },
        ];
      }
    }
    //Fix for 24-parganas
    tempMap["North 24 Parganas"] = Object.assign([], tempMap["N-24 Pgs"].concat(tempMap["North 24 Pgs"]));
    delete tempMap["N-24 Pgs"];
    delete tempMap["North 24 Pgs"];
    tempMap["North 24 Parganas"].forEach((elm) => (elm["h_zone"] = "North 24 Parganas"));

    this.props.setTotalHospitalDetails(tempMap);
    this.props.setRawHospitalData(data);
  }

  getLocationTrack = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        //watchPosition(  // need to implement getPosition logic with timeout for movement
        (pos) => {
          if (this.loc_locationCoordinates_lat != pos.coords.latitude && this.loc_locationCoordinates_long != pos.coords.longitude) {
            console.log(pos.coords.latitude);
            console.log(pos.coords.longitude);
            this.getFormattedAddress(pos.coords.latitude, pos.coords.longitude);
          }
        },
        (error) => {
          //ifgeolocation failed
          if (error.message == "Timeout expired") {
            this.handleBackDropClose();
            this.errorBodyMessage = "Geo location timed out";
            this.setState(
              {
                viewErrorModal: true,
              },
              () => this.getLocationTrack()
            );

            //temporary for DEV
            //this.getFormattedAddress(22.5815353, 88.466984);
          } else {
            //show pop up if denied
            this.handleBackDropClose();
            this.setState({
              openLocationAlert: true,
            });
          }
        }
      );
    }
  };

  getFormattedAddress = (lat, long) => {
    this.loc_locationCoordinates_lat = lat; //for local check
    this.loc_locationCoordinates_long = long; //for local check
    CommunicatorFetch(ApiUrls.getUserCurrentLocation, lat + "," + long).then(
      (data) => {
        if (data.results.length != 0) {
          this.props.setFormattedAddress(data.results[0].formatted_address);
          this.props.setUserCords([data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]);
          this.props.setAddressComponents(data.results[0].address_components);

          this.setState({
            openBackDrop: false,
          });
        } else {
          // Google denied Map, hence need to show proper error messages
          if (env == "prod") {
            this.errorBodyMessage = "Google MAP API Denied";
            this.setState(
              {
                openBackDrop: false,
                viewErrorModal: true,
              },
              () => this.props.setUserCords([lat, long])
            );
          }
          //current implementation for DEV purposes start
          else if (env == "dev") {
            let data = dummyLoc;
            this.props.setFormattedAddress(data.results[0].formatted_address);

            this.props.setAddressComponents(data.results[0].address_components);
            this.props.setUserCords([data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]);
            this.setState({
              openBackDrop: false,
            });
          }

          //current implementation for DEV purposes end
        }
      },
      (error) => {
        // Google Web api failed, hence need to show proper error messages
        if (env == "prod") {
          this.errorBodyMessage = "Google MAP API failed";
          this.setState(
            {
              openBackDrop: false,
              viewErrorModal: true,
            }
            //() => this.getFormattedAddress(lat, long)
          );
        }
        //current implementation for DEV purposesstart
        else if (env == "dev") {
          let data = dummyLoc;
          this.props.setFormattedAddress(data.results[0].formatted_address);
          this.props.setUserCords([data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]);
          this.props.setAddressComponents(data.results[0].address_components);

          this.setState({
            openBackDrop: false,
          });
        }

        //current implementation for DEV purposes end
      }
    );
  };

  handleErrorClose = () => {
    this.setState({
      viewErrorModal: false,
    });
  };
  handleCloseWelcomeAlert = (el) => {
    this.setState(
      {
        openWelcomeAlert: false,
        openBackDrop: true,
      },

      () => this.getLocationTrack()
    );
  };

  handleBackDropClose = () => {
    this.setState({
      openBackDrop: false,
    });
  };

  render() {
    console.log("App Component rendered");
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Container maxWidth='md'>
          <Location />
          <Hospital />
        </Container>
        <WelcomeModal open={this.state.openWelcomeAlert} onClose={(el) => this.handleCloseWelcomeAlert(el)} />
        <ErrorModal open={this.state.viewErrorModal} onclose={() => this.handleErrorClose()} body={this.errorBodyMessage} /* open={true} onClose={() => this.handleClose()} */ />
        <Backdrop open={this.state.openBackDrop} style={{ backgroundColor: "#183259" }}>
          <div className='loadTrackerWelcome'>
            <div className='loaderContainer'>
              <CircularProgress />
            </div>
            <div className='loaderTextContainer'>Please wait while we trace your current location ..</div>
          </div>
        </Backdrop>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTotalHospitalDetails: (hospitalDetails) => dispatch(setTotalHospitalDetails(hospitalDetails)),
  setAddressComponents: (addressComponents) => dispatch(setAddressComponents(addressComponents)),
  setFormattedAddress: (formattedAddress) => dispatch(setFormattedAddress(formattedAddress)),
  setUserCords: (userCords) => dispatch(setUserCords(userCords)),
  setRawHospitalData: (rawHospitalData) => dispatch(setRawHospitalData(rawHospitalData)),
});

export default connect(null, mapDispatchToProps)(App);
