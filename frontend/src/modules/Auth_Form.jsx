import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "/src/functions/api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA_OBJECT } from "/src/functions/constants";

import { createAndShowAlert }  from "/src/functions/react_segments";

class Auth_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { name, email, password } = this.state;
    const { route, method } = this.props;

    try {
      const payload =
        method === "login" ? { email, password } : { name, email, password };
      const res = await api.post(route, payload); // Make the API call

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem(USER_DATA_OBJECT, JSON.stringify({'user': res.data.user}));

        createAndShowAlert("info", "Logged in Successfully", true);
        document.location = '/dashboard';
      } else {
        createAndShowAlert("success");
        document.location = '/login';
      }
    } catch (error) {
      if (error.response) {
        let errorMessage = error.response.data.detail || error.response.data;
        // Server responded with a status other than 200 range
          console.error(errorMessage);
        if (typeof errorMessage === 'object') {
          errorMessage = JSON.stringify(errorMessage);
        }
        
        createAndShowAlert("error", `Error Response: ${errorMessage}`, true);
      } else {
        // Network error or other issues
        createAndShowAlert("error", `Error: ${error.message}`, true);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password, loading } = this.state;
    const { method } = this.props;
    const behav = method === "login" ? "Login" : "Register";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray dark:bg-dark-bg text-gray-800 dark:text-gray-200">
        <h2 className="text-4xl font-semibold mb-6">Campus Coordination System</h2>
        <div className="w-full max-w-md bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-4">
            <u>
              <i>{behav} - Form</i>
            </u>
          </h3>
          <form onSubmit={this.handleSubmit}>
            {behav === "Register" && (
              <input
                className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                value={name}
                placeholder="Enter full name"
                onChange={this.handleInputChange}
                required
              />
            )}
            <input
              className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              value={email}
              placeholder="Enter email address"
              onChange={this.handleInputChange}
              required
            />
            <input
              className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              value={password}
              placeholder="Enter strong password"
              onChange={this.handleInputChange}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg text-white ${
                loading ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-400"
              } transition duration-200`}
            >
              {loading ? <div className="loader m-auto"></div> : behav}
            </button>
          </form>
          {behav === "Login" && (
            <>
              <p className="mt-4 text-center">
                <Link
                  to="#"
                  className="text-blue-500 hover:underline dark:text-blue-300"
                >
                  Forgot Password?
                </Link>
              </p>
              <p className="mt-2 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline dark:text-blue-300"
                >
                  Register
                </Link>
              </p>
            </>
          )}
          {behav === "Register" && (
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline dark:text-blue-300"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Auth_Form;