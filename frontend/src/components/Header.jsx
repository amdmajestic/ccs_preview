import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChalkboardTeacher as NavDashboardIcon,
  FaHome as NavHomeIcon,
  FaSignInAlt as NavLoginIcon,
  FaUserPlus as NavRegsiterIcon,
  FaTable as NavCrcAlcIcon,
  FaUserEdit as NavUserProfileIcon,
  FaBars as NavHamburgerBtnIcon,
  FaBackspace as UserLogoutBtnIcon,
  FaServicestack as NavApisBtn,
} from "react-icons/fa"; // Fa icons library
import _ASSETS_ from "/src/assets/__assets_traits";
import { default as _R_ } from "../directives/references.routes";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false, // Track mobile menu state
      instructorId: props.instructorId,
      loggedIn: props.loggedIn,
      activeBar: "",
      currentPage: _R_["route-redirect-app"],
    };
  }

  // componentDidMount() {
  //   let user_obj = localStorage.getItem(USER_DATA_OBJECT);
  //   if(user_obj) {
  //     user_obj = JSON.parse(user_obj);
  //     const { id: user_id } = user_obj.user;
  //     this.setState({instructorId: user_id});
  //   }
  // }

  componentDidUpdate(previousProps) {
    if (this.props.loggedIn !== previousProps.loggedIn) {
      this.setState({
        loggedIn: this.props.loggedIn,
      });
    }
    if (this.props.instructorId !== previousProps.instructorId) {
      this.setState({
        instructorId: this.props.instructorId,
      });
    }
    if (this.props.currentPage !== previousProps.currentPage) {
      this.setState({
        currentPage: _R_["route-redirect-app"],
      });
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
  };

  restateActiveBarName = (navBtn) => {
    this.setState(() => ({
      activeBar: navBtn.textContent,
    }));
  };

  handleNavButtonClick = (event) => {
    this.restateMobileMenu();
    this.restateActiveBarName(event.currentTarget);
  };

  getClassStyles(linkIsActive, isMobileMenuOpen) {
    const styleBaseClasses =
      "items-center space-x-1 py-1 px-3 rounded-md backdrop-blur-sm dark:backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition-all";
    const styleActiveClasses =
      "text-yellow-400 dark:text-sky-400 border-b-2 dark:border-sky-400 pointer-events-none cursor-not-allowed";
    const styleInactiveClasses =
      "flex hover:text-gray-300 dark:hover:text-sky-300";

    if (linkIsActive) {
      return `${styleBaseClasses}  ${styleActiveClasses}  ${
        isMobileMenuOpen ? "hidden" : "flex"
      }`;
    } else {
      return `${styleBaseClasses}  ${styleInactiveClasses}  ${
        isMobileMenuOpen && "justify-self-center"
      }`;
    }
  }

  createHeaderLinks = () => {
    const { isMobileMenuOpen, instructorId, loggedIn } = this.state;

    return (
      <>
        {/* Only render this NavLink if the current path isn't '/about' */}
        {loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-dashboard"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavDashboardIcon />
            <span>Dashboard</span>
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-home"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavHomeIcon />
            <span>Home</span>
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-login"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavLoginIcon />
            <span>Login</span>
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-register"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavRegsiterIcon />
            <span>Register</span>
          </NavLink>
        )}
        {loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-course-allocation"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavCrcAlcIcon />
            <span>Course Allocation</span>
          </NavLink>
        )}
        {loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-api-button-table"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavApisBtn />
            <span>Api Buttons</span>
          </NavLink>
        )}
        {loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={_R_["route-timetable-management"]}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavCrcAlcIcon />
            <span>Timetable Management</span>
          </NavLink>
        )}
        {loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={`${_R_["route-self-profile-view+<id:number>"]}/${instructorId}`}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <NavUserProfileIcon />
            <span>Update Profile</span>
          </NavLink>
        )}
        {loggedIn && (
          <NavLink
            onClick={this.handleNavButtonClick}
            to={$_LOGOUT_ROUTE}
            className={({ isActive }) =>
              this.getClassStyles(isActive, isMobileMenuOpen)
            }
          >
            <UserLogoutBtnIcon />
            <span>Logout</span>
          </NavLink>
        )}
      </>
    );
  };

  render() {
    const { isMobileMenuOpen, activeBar, currentPage } = this.state;

    return (
      <header className="bg-blue-600 dark:bg-purple-900 text-white dark:text-sky-200 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo/Branding - aligned to the left */}
            <div className="flex items-center ml-0">
              <NavLink to={_R_["route-home"]} className="hover:text-gray-300">
                <div className="relative w-12 h-12 rounded-md overflow-hidden transition-all duration-300 group hover:scale-110 hover:shadow-[0px_0px_20px_10px_whitesmoke]">
                  <img
                    src={_ASSETS_.CcsLogo}
                    // Add Fallback Image
                    onError={(e) => {
                      e.target.onerror = null; // To prevent infinite loops if the fallback image fails as well
                      e.target.src = "$_NA_ANY_IMAGE_URL"; // Replace with your actual fallback image URL
                    }}
                    alt="Campus Coordination System"
                    className="w-full h-full object-cover"
                  />
                </div>
              </NavLink>
            </div>

            {!isMobileMenuOpen && (
              <div className="flex py-2 justify-center md:hidden w-full">
                <big>
                  <span className="text-lg font-bold underline underline-offset-8">
                    {activeBar ? (
                      activeBar
                    ) : (
                      currentPage===_R_["route-home"]
                    ) ? (
                      document.querySelector("a[aria-current='page']")?.textContent ?? "Home"
                    ) : currentPage===_R_["route-dashboard"]
                    && (
                      document.querySelector("a[aria-current='page']")?.textContent ?? "Dashboard"
                    )}
                  </span>
                </big>
                
                {/* <small>
                  <small>
                    <small>
                      <samp>
                        <em>Navigate to become visible here!</em>
                      </samp>
                    </small>
                  </small>
                </small> */}
              </div>
            )}

            {/* Main content centered */}
            <div className="flex items-center justify-center flex-grow">
              <nav
                className={`space-x-4 hidden md:flex ${
                  isMobileMenuOpen ? "flex" : "hidden"
                }`}
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
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:hidden mt-4 space-y-4`}
          >
            {this.createHeaderLinks()}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
