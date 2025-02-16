import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "/src/functions/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "/src/functions/constants";

import { default as _R_ } from "../directives/references.routes";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: null,
      onAuth: props.onAuth,
    };
  }
  componentDidMount() {
    if(this.state.onAuth!==null) {
      this.auth().catch(() => this.setState({ isAuthorized: false }));
    }
  }

  refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("api/token/refresh/", {
        // send as payload:
        refresh: refreshToken,
        // refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczODcwOTY4MywiaWF0IjoxNzM2MTE3NjgzLCJqdGkiOiI2ZWVmZDEyNTdjYjQ0MjdiYmU4ZjQ4NWQ1MmJjZDkzZCIsInVzZXJfaWQiOjMwfQ.JVx6Y8vqL6MO4DQaKW87YTomi-8W29wfvDMJrHSCYVE",
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        this.setState({ isAuthorized: true });
      } else {
        this.setState({ isAuthorized: false });
      }
    } catch (error) {
      this.setState({ isAuthorized: false });
    }
  };

  auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({ isAuthorized: false });
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp; // exp => Expiration
    const now = Date.now() / 1000; // to get date in seconds, not milliseconds

    if (tokenExpiration < now) {
      await this.refreshToken();
    } else {
      this.setState({ isAuthorized: true });
    }
  };

  render() {
    const { onAuth, isAuthorized } = this.state;
    const { children } = this.props;

    // alert(isAuthorized+" -- "+ onAuth);

    if ((isAuthorized===null) && (onAuth!==null)) {
      return <div>Loading...</div>;
    }
    
    return(
      <>
        {
          // window.location.reload()
          (
            onAuth===null
          ) ? (
            <>
              {children}
            </>
          ) : (
              (!isAuthorized && (onAuth===true))
              || 
              (isAuthorized && (onAuth===false))
            ) ? (
            <Navigate replace to={_R_["route-redirect-app"]} />
          ) : (
              (!isAuthorized && (onAuth===false))
              || 
              (isAuthorized && (onAuth===true))
            ) && (
            children
          )
        }
      </>
      )
  }
}

export default ProtectedRoute;
