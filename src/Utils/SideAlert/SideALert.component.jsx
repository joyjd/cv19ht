import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction='left' />;
}

const SideAlert = (props) => {
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "left",
  });
  const { vertical, horizontal } = state;

  return (
    <Snackbar autoHideDuration={2000} key={Grow} TransitionComponent={TransitionLeft} anchorOrigin={{ vertical, horizontal }} open={props.open} onClose={props.handleAlertClose} key={vertical + horizontal}>
      <SnackbarContent
        style={{
          backgroundColor: "#000000eb",
          padding: "0px 0 0 20px",
          borderRadius: "15px",
          color: "#c4fff4",
          border: "3px solid #284065ba",
        }}
        message={
          <span id='client-snackbar'>
            Updating your current location ..{props.c_data[0]},{props.c_data[1]}
          </span>
        }
      />
    </Snackbar>
  );
};

export default SideAlert;
