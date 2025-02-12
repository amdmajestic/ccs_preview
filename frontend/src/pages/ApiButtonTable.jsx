import React, { Component } from "react";
import api from "/src/functions/api";

class ApiButtonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      loading: false,
      formData: {},
      error: "",
    };
  }

  handleApiCall = async (api_url, method, argumentsObj) => {
    this.setState({ loading: true });
    try {
      const response = await api({
        method: method,
        url: api_url,
        data: argumentsObj,
      });
      const data = await response.data;
      this.setState({
        apiResponse: {
          state: "success",
          response: data,
        },
      });
    } catch (error) {
      console.error("Error calling API:", error);
      this.setState({
        apiResponse: {
          state: "error",
          response: error.message,
        },
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleOnclickFeedDataBtn = (feedId) => {
    const dialog = document.querySelector(`#${feedId}`);
    dialog.showModal();
  };

  handleFormSubmit = (event, feedId) => {
    event.preventDefault();
    if (Object.values(this.state.formData).some(value => !value)) {
      this.setState({ error: "Please fill in all fields." });
      return;
    }
    this.setState({ error: "" });
    
    this.closeDialog(feedId);
  };

  handleInputChange = (e, key) => {
    const updatedFormData = { ...this.state.formData, [key]: e.target.value };
  
    this.setState({ formData: updatedFormData });
  };

  closeDialog = (feedId) => {
    const dialog = document.querySelector(`#${feedId}`);
    dialog.close();
  };

  render() {
    const apiButtons = [
      {
        api_url: "api/feed/factory/",
        method: "POST",
        arguments: ["value1", "value2"],
        button_name: "Feed Factory Backend Data to PGSQL",
      },
      {
        api_url: "course_allocation/instructors/",
        method: "GET",
        arguments: [],
        button_name: "View Instructors",
      },
      {
        api_url: "course_allocation/courses/",
        method: "GET",
        arguments: [],
        button_name: "View Courses",
      },
      {
        api_url: "course_allocation/classes/",
        method: "GET",
        arguments: [],
        button_name: "View Classes",
      },
      {
        api_url: "course_allocation/lectures/",
        method: "GET",
        arguments: [],
        button_name: "View Lectures",
      },
      {
        api_url: "course_allocation/allocate/",
        method: "GET",
        arguments: [],
        button_name: "Allocate a Course",
      },
      {
        api_url: "course_allocation/allocate_all_courses/",
        method: "GET",
        arguments: [],
        button_name: "Allocate All Courses",
      },
      {
        api_url: "course_allocation/instructor/profile/",
        method: "GET",
        arguments: ["id"],
        button_name: "View Instructor Profile By ID",
      },
    ];

    return (
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white text-center mb-8">
          API Button Table
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 dark:bg-indigo-500 text-white">
                <th className="p-4 text-left">Target Function</th>
                <th className="p-4 text-left">API Method</th>
                <th colSpan={2} className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {apiButtons.map((button, index) => {
                const feedId = `feed-parms-${index}`;
                return (
                  <tr key={index} className="border-b border-blue-200 dark:border-gray-600">
                    <td className="p-4 text-gray-800 dark:text-gray-200">{button.button_name}</td>
                    <td className="p-4 text-gray-800 dark:text-gray-200">{button.method}</td>
                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row sm:space-x-2">
                        <button
                          onClick={() => this.handleApiCall(button.api_url, button.method, button.arguments)}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                          Call API
                        </button>
                        {button.arguments.length !== 0 && (
                          <>
                            <button
                              onClick={() => this.handleOnclickFeedDataBtn(feedId)}
                              className="bg-blue-600 text-white mx-0 my-2 sm:mx-2 sm:my-0 py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                              Feed Data
                            </button>
                            <dialog id={feedId} className="left-2.5 sm:left-1/3 md:translate-1/3 lg:translate-x-1/3 items-center content-center justify-center bg-transparent" onClick={(e) => {
                              if (e.target === e.currentTarget) this.closeDialog(feedId);
                            }}>
                              <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                                <form onSubmit={()=> this.handleFormSubmit(event, feedId)} className="bg-sky-50 dark:bg-slate-700 p-3 rounded-lg bg-opacity-50">
                                  <button type="button" onClick={() => this.closeDialog(feedId)} className="text-red-500">X</button>
                                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Enter API Data</h2>
                                  {button.arguments.map((arg, idx) => (
                                    <div key={idx} className="mb-4">
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{arg}</label>
                                      <input
                                        type="text"
                                        placeholder={`Enter ${arg}`}
                                        onChange={(e) => this.handleInputChange(e, arg)}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                      />
                                    </div>
                                  ))}
                                  {this.state.error && <p className="text-red-500">{this.state.error}</p>}
                                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg">Submit</button>
                                </form>
                              </div>
                            </dialog>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {this.state.loading && (
          <div className="mt-4 text-center text-blue-600 dark:text-gray-300">
            Loading...
          </div>
        )}
        {this.state.apiResponse && (
          <div className="mt-4 p-4 bg-gray-400 dark:bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-gray-400">API Response:</h3>
            <pre className={
              "p-6 rounded-lg overflow-auto text-sm " +
              (this.state.apiResponse.state === "success"
                ? " bg-green-200 dark:text-lime-50 dark:bg-green-800"
                : this.state.apiResponse.state === "error" &&
                  " bg-red-300 dark:text-purple-200 dark:bg-red-900")
            }>
              {JSON.stringify(this.state.apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }
}

export default ApiButtonTable;
