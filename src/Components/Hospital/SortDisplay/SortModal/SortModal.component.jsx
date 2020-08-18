import React from "react";

import Dialog from "@material-ui/core/Dialog";
import { Header } from "./../../../Header/Header.component";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import "./../SortModal/SortModal.style.scss";

import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function SortModal(props) {
  const [value, setValue] = React.useState(props.initialVal === "" ? "isChecked_op_hospital" : props.initialVal);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleRadioChange(event.target.value);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog fullScreen={fullScreen} open={props.open} onClose={props.onclose} aria-labelledby='Sort Hospitals' aria-describedby='Option to sort Hospitals'>
      <div className='filterTagsHeader'>Sort Hospitals</div>
      <div className='filterTagsBodySort'>
        <div className='SortTitleDesc'>You can sort list of hospitals according to your view</div>
        <div className='dividerHolder'>
          <Divider />
        </div>
        <div className='displayFlex headerTagLineDesc'></div>
        <div className='chipsHolder'>
          <RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
            <FormControlLabel value='isChecked_op_bed' control={<Radio color='primary' />} label='More vacancy of COVID beds' />
            <FormControlLabel value='isChecked_op_hospital' control={<Radio color='primary' />} label='Hospitals nearer to your current location' />
          </RadioGroup>
        </div>
        <div className='dividerHolder displayEqual'>
          <Button variant='contained' color='primary' onClick={() => props.onClose(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={() => props.onClose(true)} autoFocus>
            Sort
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
