import React from "react";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import { Header } from "./../../../Header/Header.component";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

class SortModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.props.onclose} aria-labelledby='Select Hospital Zones' aria-describedby='Option to select Hospital Area Tags'>
        <Header />
        <div className='filterTagsHeader'>Select Areas/ Zones</div>
        <div className='filterTagsBody'>
          <div>You can select areas/zones to view COVID19 treatment providing hospitals of that area.</div>
          <div className='dividerHolder'>
            <Divider />
          </div>
          <div className='displayFlex headerTagLineDesc'>
            <div>
              <LocalOfferIcon fontSize='small' />
            </div>
          </div>
          <div className='chipsHolder'>
            <RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
              <FormControlLabel value='isChecked_op_bed' control={<Radio color='primary' />} label='More vacancy of COVID beds' />
              <FormControlLabel value='isChecked_op_hospital' control={<Radio color='primary' />} label='Hospitals nearer to your current location' />
            </RadioGroup>
          </div>
          <div className='dividerHolder displayEqual'>
            <Button onClick={() => props.onClose(false)} color='primary'>
              Cancel
            </Button>
            <Button onClick={() => props.onClose(true)} color='primary' autoFocus>
              Okay
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
