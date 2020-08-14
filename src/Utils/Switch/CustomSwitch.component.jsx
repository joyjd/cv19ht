import React from "react";
import Switch from "@material-ui/core/Switch";

const CustomSwitch = (props) => {
  return <Switch checked={props.checkedState} onChange={(e) => props.handleChangeSwitch(e)} color='primary' inputProps={{ "aria-label": "primary checkbox" }} />;
};

export default CustomSwitch;
