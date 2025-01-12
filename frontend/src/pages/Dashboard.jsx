import React, { Component } from 'react';
import { USER_DATA_OBJECT } from '../functions/constants';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrDp: "profile_image.jpg",
    };
  }

  
  setState_IntrDp = (newSrc) => {
    this.setState({
      instrDp: newSrc,
    });
  };

  render() {
    const { name } = JSON.parse(localStorage.getItem(USER_DATA_OBJECT)).user;

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Top Navbar */}
        <nav className="w-full h-16 flex justify-between px-4 items-center shadow-lg bg-indigo-200 dark:bg-gray-900 dark:mix-blend-screen">
          <div className="text-indigo-700 dark:text-indigo-500 font-bold text-lg cursor-pointer">Instructor Dashboard</div>
        </nav>

        {/* Logo and Institution Name */}
        <div className="flex justify-start items-center p-4 bg-sky-50 dark:bg-gray-800 shadow-inner drop-shadow-md dark:mix-blend-screen">
          <h2 className="text-lg font-bold text-blue-800 dark:text-blue-400 ml-4">Instructor Authority Information</h2>
        </div>

        {/* Main Navbar with Dropdowns */}
        <nav className="bg-white dark:bg-gray-800 shadow-lg w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-start items-center h-16">
              <div className="flex space-x-6 items-center">
                {/* Course Allocation Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 font-medium transition">
                    Course Allocation
                  </button>
                  <div className="hidden group-hover:block hover:block absolute bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 rounded-md mt-2 w-40">
                    <a href="/course-allocation/manual" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">Manual</a>
                    <a href="/course-allocation/automatic" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">Automatic</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Social Media Icons (Top Right) */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <a href="(link unavailable)" target="_blank" className="text-blue-600 hover:text-blue-800 transition">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="(link unavailable)" target="_blank" className="text-pink-500 hover:text-pink-700 transition">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="(link unavailable)" target="_blank" className="text-blue-400 hover:text-blue-600 transition">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="(link unavailable)" target="_blank" className="text-blue-700 hover:text-blue-900 transition">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col items-center justify-center flex-grow mt-20 space-y-8">
          <div className="bg-opacity-90 p-6 rounded-lg shadow-lg text-center max-w-2xl backdrop-blur-lg bg-gradient-to-r from-indigo-500 to-blue-600">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Campus Coordination System</h1>
            <p className="text-lg text-white">Simplify your campus management with cutting-edge features and modern solutions.</p>
          </div>

          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Instructor Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src={this.state.instrDp} 
                  onError={() => this.setState_IntrDp($_NA_PROFILE_IMAGE_URL)} 
                  alt="Instructor DP"
                  className="h-10 w-10 rounded-full" 
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">Engr. Dr. Sherjeel Farooqui</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Course Coordinator</p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-gray-300">Department:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Computer Science</p>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Course Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg text-white">
                <h3 className="text-2xl font-bold">Courses Offered</h3>
                <p className="text-3xl font-semibold mt-4">120</p>
              </div>
              <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-6 rounded-lg text-white">
                <h3 className="text-2xl font-bold">Students Enrolled</h3>
                <p className="text-3xl font-semibold mt-4">850</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-lg text-white">
                <h3 className="text-2xl font-bold">Courses Completed</h3>
                <p className="text-3xl font-semibold mt-4">95</p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Notifications</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <span className="text-gray-900 dark:text-white">New course materials uploaded for "Data Structures".</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <span className="text-gray-900 dark:text-white">Reminder: Time Table changes for next week.</span>
                <span className="text-sm text-gray-500">1 day ago</span>
              </li>
              <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <span className="text-gray-900 dark:text-white">Instructor meeting scheduled for 15th Jan.</span>
                <span className="text-sm text-gray-500">3 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
