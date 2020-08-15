import React from "react";

import "./../Ambulance/Ambulance.style.scss";

import DisplayAmbulance from "./DisplayAmbulance/DisplayAmbulanceModal.component";

import { CommunicatorFetch } from "./../../Utils/Communicator/Communicator.component";
import APiUrls from "./../../Utils/ApiUrls.data";

import DisplayCoronaDetails from "./DisplayCoronaDetails/DisplayCoronaModal.component";

class Ambulance extends React.Component {
  totalData = null;
  constructor() {
    super();
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.state = {
      infected: 0,
      recovered: 0,
      deceased: 0,
      displayambulance: false,
      displayCorona: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.getCoronaDetails();
  }

  getCoronaDetails = () => {
    CommunicatorFetch(APiUrls.getCoronaUpdate).then(
      (data) => {
        console.log(data);
        this.totalData = data["West Bengal"]["districtData"];
        let infected = 0;
        let recovered = 0;
        let dead = 0;
        Object.keys(this.totalData).forEach((dst_name) => {
          infected += this.totalData[dst_name]["confirmed"];
          recovered += this.totalData[dst_name]["recovered"];
          dead += this.totalData[dst_name]["deceased"];
        });
        this.setState({
          infected: infected,
          recovered: recovered,
          deceased: dead,
        });
      },
      (error) => {}
    );
  };
  handleScroll = () => {
    const scrollY = window.scrollY;
    const offsetTop = this.myRef.current.offsetTop;
    let leftPosition = scrollY - offsetTop;
    leftPosition = leftPosition + 250;
    //console.log(leftPosition);
    this.myRef2.current.style.left = leftPosition + "px";
    //this.myRef2.current.style.transition = "left 1s";

    if (this.ambulanceTravelNode !== null && this.ambulanceTravelNode > leftPosition) {
      this.myRef2.current.classList.add("displayAmb2");
      this.myRef2.current.classList.remove("displayAmb1");
    } else if (this.ambulanceTravelNode !== null && leftPosition < 0) {
      this.myRef2.current.classList.remove("displayAmb2");
      this.myRef2.current.classList.add("displayAmb1");
    }
    this.ambulanceTravelNode = leftPosition;
  };

  handleCloseAmbulanceModal = () => {
    this.setState({
      displayambulance: false,
    });
  };
  openAmbulanceModal = () => {
    this.setState({
      displayambulance: true,
    });
  };

  openCoronaModal = () => {
    this.setState({
      displayCorona: true,
    });
  };

  closeCoronaModal = () => {
    this.setState({
      displayCorona: false,
    });
  };

  render() {
    return (
      <div>
        <div className='amb' ref={this.myRef} onScroll={this.handleScroll}>
          <div className='bg-move displayAmb1' ref={this.myRef2}>
            <div className='coronaDataHolderTitle '>COVID19 Updates(WB)</div>

            <div className='dataHolder'>
              <div>
                <div className='dataDiv'>Infected</div>
                <div>{this.state.infected}</div>
              </div>
              <div>
                <div className='dataDiv'>Recovered</div>
                <div>{this.state.recovered}</div>
              </div>
              <div>
                <div className='dataDiv'>Death</div>
                <div>{this.state.deceased}</div>
              </div>
            </div>
            <div className='coronaDetailsPromptHolder' onClick={() => this.openCoronaModal()}>
              <mark>
                <em>View District-wise</em>
              </mark>
            </div>
            {/*  <div className='coronaDetailsPromptHolder'>
              <div onClick={() => this.openCoronaModal()}>
                <em>View District-wise</em>
              </div>
            </div>
            <div className='ambulancePromptHolder'>
              <label onClick={() => this.openAmbulanceModal()}>Find Ambulances</label>
            </div> */}
          </div>
        </div>
        <div className='ambLight light--flash'></div>
        <div className='ambulanceContainer' onClick={() => this.openAmbulanceModal()}>
          <div className='ambulancePromptHolder'>Find Ambulances Near You</div>
        </div>

        <DisplayAmbulance onclose={() => this.handleCloseAmbulanceModal()} open={this.state.displayambulance} />
        <DisplayCoronaDetails c_data={this.totalData} open={this.state.displayCorona} onClose={() => this.closeCoronaModal()} />
      </div>
    );
  }
}

export default Ambulance;
