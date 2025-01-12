import React, { Component } from "react";
import _COMPONENTS_ from "/src/components/__components_traits";
import SuccessAlert from "../modules/Alerts/SuccessAlert";

class Login extends Component {
  componentDidMount() {
    // Update document title when the component mounts
    document.title = "Login";
  }

  render() {
    return (
      <>
        <_COMPONENTS_.Auth_Form route="/api/instructors/login/" method="login" />;
      </>
    )
  }
}

export default Login;
