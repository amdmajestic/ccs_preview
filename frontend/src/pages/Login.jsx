import React, { Component } from "react";
import _MODULES_ from "/src/modules/__modules_traits";

class Login extends Component {
  componentDidMount() {
    // Update document title when the component mounts
    document.title = "Login";
  }

  render() {
    return (
      <>
        <_MODULES_.Auth_Form route="/api/instructors/login/" method="login" />;
      </>
    )
  }
}

export default Login;
