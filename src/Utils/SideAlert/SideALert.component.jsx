import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Slide from "@material-ui/core/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction='left' />;
}

const SideAlert = (props) => {
  const [state] = React.useState({
    vertical: "top",
    horizontal: "left",
  });
  const { vertical, horizontal } = state;

  return props.c_data !== null ? (
    <Snackbar autoHideDuration={4000} TransitionComponent={TransitionLeft} anchorOrigin={{ vertical, horizontal }} open={props.open} onClose={props.handleAlertClose} key={vertical + horizontal}>
      <SnackbarContent
        style={{
          backgroundColor: "#000000eb",
          padding: "0px 0 0 20px",
          borderRadius: "15px",
          color: "#c4fff4",
          border: "3px solid #284065ba",
        }}
        message={<span id='client-snackbar'>Updating your current location ..</span>}
      />
    </Snackbar>
  ) : null;
};

export default SideAlert;
