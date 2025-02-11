import React, { Component } from 'react';

class ErrorAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true, // Alert visibility state
    };
  }

  // Close the alert when the button is clicked
  closeAlert = () => {
    this.setState({ isVisible: false });
  };

  componentDidMount() {
    // Automatically hide the alert after 5 seconds
    this.timer = setTimeout(() => {
      this.setState({ isVisible: false });
    }, 5000);
  }

  componentWillUnmount() {
    // Cleanup timer on unmount
    clearTimeout(this.timer);
  }

  render() {
    const { message, onlyNew: showOnlyNew, defaultMessage = 'An error occurred!' } = this.props;
    const alertMessage = message || ""; // Use the message prop or an empty string if null/undefined
    const showOnlyNewFlag = showOnlyNew === true;

    return (
      <>
        {this.state.isVisible && (
          <div
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-lg p-4 bg-red-500 text-white rounded-lg shadow-lg flex items-start justify-between transition-all duration-300"
          >
            {/* Fixed ✖ symbol */}
            <span className="text-4xl absolute top-0 left-0 ml-4 mt-2">🚫</span>

            <div className="flex flex-col items-start ml-12">
              {/* If showOnlyNew is false, display defaultMessage */}
              {!showOnlyNewFlag && <p className="ml-2 text-lg font-semibold">{defaultMessage}</p>}

              {/* If alertMessage exists, display it in a new line */}
              {alertMessage && (
                <p className="ml-2 text-lg mt-2 font-semibold">{alertMessage}</p>
              )}
            </div>

            {/* Close Button (cross) */}
            <button
              onClick={this.closeAlert}
              className="text-white text-2xl font-bold ml-4"
            >
              &times;
            </button>
          </div>
        )}
      </>
    );
  }
}

export default ErrorAlert;
