import React from "react";

import "./../Ambulance/Ambulance.style.scss";

import { CommunicatorFetch } from "./../../Utils/Communicator/Communicator.component";
import APiUrls from "./../../Utils/ApiUrls.data";

class Ambulance extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.state = {
      infected: 0,
      recovered: 0,
      deceased: 0,
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
        let totalData = data["West Bengal"]["districtData"];
        let infected = 0;
        let recovered = 0;
        let dead = 0;
        Object.keys(totalData).forEach((dst_name) => {
          infected += totalData[dst_name]["confirmed"];
          recovered += totalData[dst_name]["recovered"];
          dead += totalData[dst_name]["deceased"];
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
    const scrollTop = this.myRef.current.scrollTop;
    const offsetTop = this.myRef.current.offsetTop;
    let leftPosition = scrollY - offsetTop;
    leftPosition = leftPosition + 250;
    //console.log(leftPosition);
    this.myRef2.current.style.left = leftPosition + "px";
    //this.myRef2.current.style.transition = "left 1s";

    if (this.ambulanceTravelNode != null && this.ambulanceTravelNode > leftPosition) {
      this.myRef2.current.classList.add("displayAmb2");
      this.myRef2.current.classList.remove("displayAmb1");
    } else if (this.ambulanceTravelNode != null && leftPosition < 0) {
      this.myRef2.current.classList.remove("displayAmb2");
      this.myRef2.current.classList.add("displayAmb1");
    }
    this.ambulanceTravelNode = leftPosition;
  };

  render() {
    return (
      <div className='amb' ref={this.myRef} onScroll={this.handleScroll}>
        <div className='bg-move displayAmb1' ref={this.myRef2}>
          <div className='ambLight light--flash'></div>
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
        </div>
      </div>
    );
  }
}

export default Ambulance;
