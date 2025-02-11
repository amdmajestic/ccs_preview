import React, { Component } from "react";
import _MODULES_ from "/src/modules/__modules_traits";

class Register extends Component {
  componentDidMount() {
    // Update document title when the component mounts
    document.title = "Register";
  }

  render() {
    return <_MODULES_.Auth_Form route="/api/instructors/register/" method="register" />;
  }
}

export default Register;
