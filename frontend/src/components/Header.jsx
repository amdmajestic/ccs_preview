import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher as NavDashboardIcon, FaHome as NavHomeIcon, FaSignInAlt as NavLoginIcon, FaUserPlus as NavRegsiterIcon, FaTable as NavCrcAlcIcon, FaUserEdit as NavUserProfileIcon, FaBars as NavHamburgerBtnIcon, FaBackspace as UserLogoutBtnIcon } from "react-icons/fa"; // Fa icons library
import { USER_DATA_OBJECT } from "/src/functions/constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false, // Track mobile menu state
      instructorId: "",
    };
  }

  componentDidMount() {
    let user_obj = localStorage.getItem(USER_DATA_OBJECT);
    if(user_obj) {
      user_obj = JSON.parse(user_obj);
      const { id: user_id } = user_obj.user;
      this.setState({instructorId: user_id});
    }
  }

  // Toggle mobile menu visibility
  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  restateMobileMenu = () => {
    this.setState(() => ({
      isMobileMenuOpen: false,
    }));
  }

  createHeaderLinks = () => {
    const { isMobileMenuOpen, instructorId } = this.state;
    const loggedIn = localStorage.getItem(USER_DATA_OBJECT) ? true : false;

    return (
      <>
        {/* Only render this NavLink if the current path isn't '/about' */}
        { loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
              }
            >
            <NavDashboardIcon />
            <span>Dashboard</span>
          </NavLink>
        )}
        { !loggedIn && (
          <NavLink
          onClick={this.restateMobileMenu}
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <NavHomeIcon />
            <span>Home</span>
          </NavLink>
        )}
        { !loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
            to="/login"
            className={({ isActive }) =>
              isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <NavLoginIcon />
            <span>Login</span>
          </NavLink>
        )}
        { !loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
            to="/register"
            className={({ isActive }) =>
              isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <NavRegsiterIcon />
            <span>Register</span>
          </NavLink>
        )}
        { loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
            to="/course-allocation"
            className={({ isActive }) =>
              isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <NavCrcAlcIcon />
            <span>Course Allocation</span>
          </NavLink>
        )}
        { loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
            to="/timetable-management"
            className={({ isActive }) =>
              isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <NavCrcAlcIcon />
            <span>Timetable Management</span>
          </NavLink>
        )}
        { loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
            to={`/instructor/profile/${instructorId}`}
            className={({ isActive }) =>
              isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <NavUserProfileIcon />
            <span>Update Profile</span>
          </NavLink>
        )}
        { loggedIn && (
          <NavLink
            onClick={this.restateMobileMenu}
            to={$_LOGOUT_ROUTE}
            className={({ isActive }) =>
              isActive
                  ? "text-yellow-400 dark:text-sky-400 "+ (isMobileMenuOpen ? "hidden" : "flex") +" items-center space-x-1 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed py-1 px-3 rounded-md backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 transition-all"
                  : "hover:text-gray-300 dark:hover:text-sky-300 "+ (isMobileMenuOpen && "justify-self-center") +" flex items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all"
            }
          >
            <UserLogoutBtnIcon />
            <span>Logout</span>
          </NavLink>
        )}
      </>
    );
  }

  render() {
    const { isMobileMenuOpen } = this.state;    

    return (
      <header className="bg-blue-600 dark:bg-purple-900 text-white dark:text-sky-200 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo/Branding - aligned to the left */}
            <div className="flex items-center ml-0">
              <NavLink to="/" className="hover:text-gray-300">
                <div className="relative w-12 h-12 rounded-md overflow-hidden transition-all duration-300 group hover:scale-110 hover:shadow-[0px_0px_20px_10px_whitesmoke]">
                  <img
                    src={vr_media("ccs-logo.png")}
                    // Add Fallback Image
                    onError={(e) => {
                      e.target.onerror = null;  // To prevent infinite loops if the fallback image fails as well
                      e.target.src = '$_NA_ANY_IMAGE_URL'; // Replace with your actual fallback image URL
                    }}
                    alt="Campus Coordination System"
                    className="w-full h-full object-cover"
                  />
                </div>
              </NavLink>
            </div>

            {/* Main content centered */}
              <div className="flex items-center justify-center flex-grow">
                <nav
                  className={`space-x-4 hidden md:flex ${isMobileMenuOpen ? "flex" : "hidden"}`}
                  >
                  {this.createHeaderLinks()}
                </nav>
              </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={this.toggleMobileMenu} className="text-white">
                <NavHamburgerBtnIcon size={24} /> 
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden mt-4 space-y-4`}>
            {this.createHeaderLinks()}
          </div> 
        </div>
      </header>
    );
  }
}

export default Header;