import React from "react";
import WelcomeModal from "./Modals/WelcomeModal/WelcomeModal.component";
import App from "./App";

class Bootbase extends React.Component {
  constructor() {
    super();
    this.state = {
      openWelcomeAlert: false,
      enableAppModule: false,
      showLocation: false,
    };
  }
  componentDidMount() {
    this.setState({
      enableAppModule: true,
      openWelcomeAlert: true,
    });
  }

  handleCloseWelcomeAlert = (el) => {
    this.setState({
      showLocation: true,
      openWelcomeAlert: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.enableAppModule ? <App showLocation={this.state.showLocation} /> : null}
        <WelcomeModal open={this.state.openWelcomeAlert} onClose={(el) => this.handleCloseWelcomeAlert(el)} />
      </div>
    );
  }
}

export default Bootbase;
