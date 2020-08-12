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

import { BackDropDefault } from "./Utils/BackDropDefault/BackDropOrg.component";

import { connect } from "react-redux";

import { Header } from "./Components/Header/Header.component";
import { Footer } from "./Components/Footer/Footer.component";
import Location from "./Components/Location/Location.component";
import Hospital from "./Components/Hospital/Hospital.component";

import { CommunicatorFetch } from "./Utils/Communicator/Communicator.component";
import ApiUrls from "./Utils/ApiUrls.data";

import { ErrorModal } from "./Modals/ErrorModal/ErrorModal.component";
import WelcomeModal from "./Modals/WelcomeModal/WelcomeModal.component";
import LocationOptionInput from "./Modals/AddressDetailModal/LocationOptionInput.component";

import { setTotalHospitalDetails } from "./redux/totalHospitalDetails/totalHospital.action";
import { setAddressComponents } from "./redux/userAddress/addressComponents.action";
import { setFormattedAddress } from "./redux/userAddress/formattedAddress.action";
import { setUserCords } from "./redux/userAddress/userCords.action";
import { setRawHospitalData } from "./redux/totalHospitalDetails/rawHospitalData.action";
import { setLocationModal } from "./redux/locationInput/locationInput.action";
import { setCordChangeFlag } from "./redux/userAddress/cordChangeFlag.action";

import { dummyLoc } from "./assets/dummyLoc";

import { createHospitalProfile, getHospitalProfileAll } from "./firebase/firebase.util";

const env = "prod"; // prod -  dev
class App extends React.Component {
  errorBodyMessage = "";
  hospitalList = [];
  loc_locationCoordinates_lat = null;
  loc_locationCoordinates_long = null;
  loc_cordChangeFlag = null;
  constructor() {
    super();
    this.state = {
      openWelcomeAlert: false,
      viewErrorModal: false,
      openBackDrop: false,
    };
  }

  componentDidMount() {
    console.log("App mounted");
    this.setState(
      {
        openWelcomeAlert: true,
        openPermissionDeniedAlert: false,
      },
      () => this.prepareHospitalData()
    );
    // createHospitalProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.loc_cordChangeFlag != this.props.userCordChangeFlag) {
      console.log("inside app update");
      this.loc_cordChangeFlag = !this.props.userCordChangeFlag;
      this.getLocationWhenCordsChangedByUser();
      this.props.setuserCordsFlag(this.loc_cordChangeFlag);
    }
  }

  prepareHospitalData = () => {
    CommunicatorFetch(ApiUrls.getHospitalCodes)
      .then((data) => {
        let tempArr = data.filter((elem) => Object.keys(elem).length >= 4).filter((el) => el["vacant"] != 0 && typeof el["vacant"] !== "string");
        this.hospitalList = Object.assign([], tempArr);
      })
      .then(() => getHospitalProfileAll())
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

  getLocationWhenCordsChangedByUser = () => {
    this.setState(
      {
        openBackDrop: true,
      },
      () => this.getFormattedAddress(this.props.userCords[0], this.props.userCords[1])
    );
  };

  getLocationTrack = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        //watchPosition(  // need to implement getPosition logic with timeout for movement
        (pos) => {
          if (this.loc_locationCoordinates_lat != pos.coords.latitude && this.loc_locationCoordinates_long != pos.coords.longitude) {
            console.log(pos.coords.latitude);
            console.log(pos.coords.longitude);
            this.getFormattedAddress(pos.coords.latitude, pos.coords.longitude);
          } else {
            this.setState({
              openBackDrop: false,
            });
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
              openPermissionDeniedAlert: true,
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

          fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=22.5815353,88.4669842&radius=3000&type=ambulance&keyword=medical&key=AIzaSyB9KK0V5vZnoWeYbZY7PHBS8srtgWTyvoI")
            .then((data) => data.json())
            .then((data) => console.log(data));

          this.setState({
            openBackDrop: false,
          });
        } else {
          // Google denied Map, hence need to show proper error messages
          if (env == "prod") {
            this.errorBodyMessage = "Well, it seems Google MAP API is denied at the moment. This is something unusual. Please refresh the page or try again in sometime.";
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
          this.errorBodyMessage = "Well, it seems Google MAP API failed at the moment. This is something unusual. Please refresh the page or try again in sometime.";
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

  searchGoogleForUserDetails = (el) => {
    let searchText = "" + el.locality + "," + el.district + "," + el.pin + ",West Bengal,India";
    let params = searchText + "&inputtype=textquery&fields=formatted_address,geometry";
    CommunicatorFetch(ApiUrls.getPlaceDetails, params).then(
      (data) => {
        if (data["candidates"].length != 0) {
          this.props.setUserCords([data["candidates"][0].geometry.location.lat, data["candidates"][0].geometry.location.lng]);

          //make custom address componnets
          let address_components = [];
          let tempAddr = data["candidates"][0]["formatted_address"].split(",");
          tempAddr.pop();

          tempAddr = tempAddr.forEach((elem) => {
            address_components.push({
              long_name: elem.trim(),
              short_name: elem.trim(),
              types: ["political", "sublocality", "sublocality_level_1"],
            });
          });

          this.props.setFormattedAddress(data["candidates"][0]["formatted_address"]);
          this.props.setAddressComponents(address_components);

          this.setState({
            openBackDrop: false,
          });
        } else {
          //show pop up for google denial

          //custom create address_format
          let address_components = [];
          let tempAddr = el.locality.split(" ");
          tempAddr.push(el.district);
          tempAddr = tempAddr.forEach((elem) => {
            address_components.push({
              long_name: elem.trim(),
              short_name: elem.trim(),
              types: ["political", "sublocality", "sublocality_level_1"],
            });
          });
          let tmmpAddr = el.locality + "," + el.district + ", pin -" + el.pin;

          this.props.setUserCords([0, 0]);
          this.props.setFormattedAddress(tmmpAddr);
          this.props.setAddressComponents(address_components);

          this.setState({
            openBackDrop: false,
          });
        }
      },
      (error) => {
        //show pop up for google denial

        //custom create address_format
        let address_components = [];
        let tempAddr = el.locality.split(" ");
        tempAddr.push(el.district);
        tempAddr = tempAddr.forEach((elem) => {
          address_components.push({
            long_name: elem.trim(),
            short_name: elem.trim(),
            types: ["political", "sublocality", "sublocality_level_1"],
          });
        });

        let tmmpAddr = el.locality + "," + el.district + ", pin -" + el.pin;

        this.props.setUserCords([0, 0]);
        this.props.setFormattedAddress(tmmpAddr);
        this.props.setAddressComponents(address_components);

        this.setState({
          openBackDrop: false,
        });
      }
    );
  };

  handleErrorClose = () => {
    this.setState(
      {
        viewErrorModal: false,
      },
      () => window.location.reload()
    );
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
  handleCloseLocationOptionAlert = (el) => {
    this.props.setLocationModal(false);
    this.setState(
      {
        openBackDrop: true,
      },
      () => {
        if (el.locality == "" && el.district == "" && el.pin == "") {
          this.getLocationTrack();
        } else {
          this.searchGoogleForUserDetails(el);
        }
      }
    );
  };

  render() {
    console.log("App Component rendered");
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Container maxWidth='md' className='containerApp'>
          <Location />
          <Hospital />
          <BackDropDefault open={this.state.openBackDrop} />
        </Container>

        {!this.state.openBackDrop ? <Footer /> : null}
        <WelcomeModal open={this.state.openWelcomeAlert} onClose={(el) => this.handleCloseWelcomeAlert(el)} />
        <LocationOptionInput open={this.props.locationModal} onClose={(el) => this.handleCloseLocationOptionAlert(el)} />
        <ErrorModal open={this.state.viewErrorModal} onclose={() => this.handleErrorClose()} body={this.errorBodyMessage} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  locationModal: state.locationModal.locationModalOpen,
  userCords: state.userCords.userCords,
  userCordChangeFlag: state.userCordChangeFlag.cordChangeFlag,
});

const mapDispatchToProps = (dispatch) => ({
  setTotalHospitalDetails: (hospitalDetails) => dispatch(setTotalHospitalDetails(hospitalDetails)),
  setAddressComponents: (addressComponents) => dispatch(setAddressComponents(addressComponents)),
  setFormattedAddress: (formattedAddress) => dispatch(setFormattedAddress(formattedAddress)),
  setUserCords: (userCords) => dispatch(setUserCords(userCords)),
  setRawHospitalData: (rawHospitalData) => dispatch(setRawHospitalData(rawHospitalData)),
  setLocationModal: (locationModal) => dispatch(setLocationModal(locationModal)),
  setuserCordsFlag: (flag) => dispatch(setCordChangeFlag(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
