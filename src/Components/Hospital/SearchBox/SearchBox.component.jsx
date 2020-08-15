import React from "react";
import { connect } from "react-redux";

import { setSelectedHospitalList } from "./../../../redux/selectedHospital/selectedHospital.action";
import { setSearchText } from "./../../../redux/search/search.action";

import "./../SearchBox/SearchBox.style.scss";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { customSort } from "./../../../Utils/Sort.component";

class SearchBox extends React.Component {
  org_selectedHospital = [];
  constructor(props) {
    super(props);
    this.state = {
      searchEngine: null,
      searchText: "",
    };
  }
  componentDidMount() {
    if (this.props.hospitalDetails !== null) {
      this.prepareSearchEngine();
    }
  }

  prepareSearchEngine = () => {
    let tempResult = [];

    Object.keys(this.props.hospitalDetails).forEach((elem) => {
      this.props.hospitalDetails[elem].forEach((el) => {
        //prepare entire list
        this.org_selectedHospital.push(el);

        //lookup in detailslist
        if (this.props.completeHospitalData[el["h_name"]]) {
          if (this.props.completeHospitalData[el["h_name"]]["name"] !== el["h_name"]) {
            tempResult.push({
              [el["h_name"]]: [el["h_name"], this.props.completeHospitalData[el["h_name"]]["name"]],
            });
          } else {
            tempResult.push({
              [el["h_name"]]: [el["h_name"]],
            });
          }
        } else {
          tempResult.push({
            [el["h_name"]]: [el["h_name"]],
          });
        }
      });
    });
    this.setState({
      searchEngine: tempResult,
    });
    //console.log(tempResult);
  };

  getSearchResults = () => {
    let finalKeys = [];
    let finalResult = [];
    let res = this.state.searchEngine.filter((ob) => {
      return ob[Object.keys(ob)[0]].filter((e) => e.toLowerCase().includes(this.state.searchText.toLowerCase())).length !== 0;
    });

    res.forEach((el) => finalKeys.push(Object.keys(el)[0]));
    finalKeys.forEach((hptl) => {
      finalResult.push(this.org_selectedHospital.filter((hosp) => hosp.h_name.includes(hptl))[0]);
    });
    finalResult = [...new Set(finalResult)];
    /* this.setState({
      selectedHospitalList: finalResult,
    }); */
    this.props.setSelectedlList(customSort(finalResult));
  };

  preparePostSearchSelectedZoneHospitalList = () => {
    let tempHptlList = [];
    this.props.selectedHospitalLocationTags.forEach((elem) => {
      if (this.props.hospitalDetails[elem]) {
        this.props.hospitalDetails[elem].forEach((el) => tempHptlList.push(el));
      }
    });
    this.props.setSelectedlList(customSort(tempHptlList));
    /* this.setState({
      selectedHospitalList: tempHptlList,
    }); */
  };

  handleSearchEngine = (el) => {
    if (el.target.value.trim() !== "") {
      this.props.setSearchText(el.target.value);
      this.setState({ searchText: el.target.value }, () => this.getSearchResults());
    } else {
      this.props.setSearchText(null);
      this.setState(
        {
          searchText: "",
        },
        () => this.preparePostSearchSelectedZoneHospitalList()
      );
    }
  };

  render() {
    return (
      <div className='displayFlex searchBoxHospitalContainer shadowCustom'>
        <div className='searchIconHolder'>
          <SearchIcon />
        </div>
        <div className='w_100'>
          <TextField type='search' id='outlined-textarea' value={this.state.searchText} className='w_100' label='Search Hospitals By Name' placeholder='Find any COVID19 hospital ..' variant='filled' onChange={(el) => this.handleSearchEngine(el)} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedlList: (selectedHospitalList) => dispatch(setSelectedHospitalList(selectedHospitalList)),
  setSearchText: (search) => dispatch(setSearchText(search)),
});

const mapStateToProps = (state) => ({
  hospitalDetails: state.totalHospitalDetails.totalHospitalDetails,
  selectedHospitalLocationTags: state.selectedHospitalZoneTags.selectedHospitalZoneTags,
  completeHospitalData: state.rawHospitalData.rawHospitalData,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
