import React from "react";

import Button from "@material-ui/core/Button";
import "./../SortDisplay/SortDisplay.style.scss";

class SortDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilteralert: false,
    };
  }

  handleOpenFilter = () => {
    this.filterContent.header = "You can sort hospitals based on :";
    //this.filterContent.body = <FilterModalTmpl initialVal={this.sortOptions} handleRadioChange={(val) => this.handleSwitchChange(val)} />;
    this.setState({
      openFilteralert: true,
    });
  };

  render() {
    return (
      <div>
        <Button className='customButtonText' onClick={() => this.handleOpenFilter()}>
          Manage View
        </Button>
      </div>
    );
  }
}

export default SortDisplay;
