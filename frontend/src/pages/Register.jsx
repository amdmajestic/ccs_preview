import React, { Component } from "react";
import _COMPONENTS_ from "../components/__components_traits";

class Register extends Component {
  componentDidMount() {
    // Update document title when the component mounts
    document.title = "Register";
  }

  render() {
    return <_COMPONENTS_.Auth_Form route="/api/instructors/register/" method="register" />;
  }
}

export default Register;
