import React, { Component, useEffect } from "react";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_DATA_OBJECT,
} from "/src/functions/constants";
import { default as _R_, BASE_URL } from "./directives/references.routes";
import "./App.css";

import * as _R_R_D_ from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons
import { default as _P_ } from "./pages/__pages_traits";
import { default as _C_ } from "./components/__components_traits";
import { default as _MD_ } from "./modules/__modules_traits";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      instructorId: null,
      loggedIn: null,
      windowReloaded: localStorage.getItem('windowReloaded') ? true : false,
    };
  }

  componentDidMount() {
    const sessionalDarkMode = sessionStorage.getItem("ccs_darkTheme");
    if (sessionalDarkMode === null) {
      sessionStorage.setItem("ccs_darkTheme", this.state.darkMode);
    } else {
      const sessionalDarkModeBool = sessionalDarkMode.stringToBool();
      document.documentElement.classList.toggle("dark", sessionalDarkModeBool);
      this.setState({ darkMode: sessionalDarkModeBool });
    }

    // window.onbeforeunload = function (event) {
      // event.preventDefault();
      // event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    // };

    localStorage.removeItem('windowReloaded');
    window.onbeforeunload = function () {
      localStorage.setItem('windowReloaded', true);
    };
  }

  // componentDidUpdate(previousProps, previousState) {
  //   if(previousState.windowReloaded !== this.state.windowReloaded) {
  //     localStorage.removeItem('windowReloaded');    
  //   }
  // }

  componentDidUpdate() {
    if(this.state.windowReloaded === true) {
      this.setState({
        windowReloaded: false,
      })
    }
  }

  // reloadComponent() {
  //   window.location.reload();
  // }

  RouteWatcher = () => {
    _R_R_D_.useLocation(); // this fucntion auto triggers when route changed

    useEffect(() => {
      let user_obj = localStorage.getItem(USER_DATA_OBJECT);
      if (user_obj) {
        user_obj = JSON.parse(user_obj);
        const { id: user_id } = user_obj.user;
        this.setState({
          instructorId: user_id,
          loggedIn: true,
        });
      } else {
        this.setState({
          loggedIn: false,
        });
      }
    }, [localStorage.getItem(USER_DATA_OBJECT)]);

    // const appLocation = _R_R_D_.useLocation();
    // const [prevPath, setPrevPath] = useState(null);

    // useEffect(() => {
    //   if (prevPath && prevPath != appLocation.pathname) {
    //     // console.log(`Previous path: ${prevPath}, Current path: ${location.pathname}`);
    //     // console.log('refresh');
    //     // this.reloadComponent();
    //   }

    //   // Update previous path on every route change
    //   setPrevPath(appLocation.pathname);

    // }, [appLocation, prevPath]); // Run when location or prevPath changes

    // return null;
  };

  // Toggle theme (dark mode)
  toggleTheme = () => {
    // sessionStorage.setItem('ccs_darkTheme', true);
    // if(sessionStorage.getItem('ccs_darkTheme') === null)
    this.setState((prevState) => {
      const newDarkMode = !prevState.darkMode;
      document.documentElement.classList.toggle("dark", newDarkMode);
      sessionStorage.setItem("ccs_darkTheme", newDarkMode);
      return { darkMode: newDarkMode };
    });
  };

  // Render method where JSX is returned
  render() {
    const { darkMode, instructorId, loggedIn, windowReloaded } = this.state;

    return (
      <div className="min-h-screen w-full flex flex-col justify-self-center">
        {/* <button onClick={
          ()=> {
            console.log(this.state.loggedIn);
            
            this.setState({
              loggedIn: !this.state.loggedIn,
            })

            console.log(this.state.loggedIn);
          }
        }>
          AA
        </button> */}
        <_R_R_D_.BrowserRouter basename={BASE_URL}>
          <this.RouteWatcher />
          { windowReloaded && (
              <_R_R_D_.Navigate replace to={_R_["route-redirect-app"]}/>
            )
          }
          <_C_.Header instructorId={instructorId} loggedIn={loggedIn} />
          <div
            className={`${
              darkMode ? "bg-dark-bg" : "bg-light-gray"
            } transition duration-300`}
          >
            {/* Theme Toggle Button */}
            <div className="relative p-2 backdrop-blur-xl bg-orange-50 dark:bg-slate-500 bg-opacity-30 shadow-lg flex justify-end">
              <button
                onClick={this.toggleTheme}
                className={`p-4 rounded-full transition-all duration-300 flex items-center justify-center 
                  ${
                    darkMode
                      ? "bg-indigo-400 text-red-300"
                      : "bg-blue-300 text-slate-800"
                  } 
                  backdrop-blur-md bg-opacity-60 shadow-md hover:bg-opacity-40 border hover:border-teal-950 dark:hover:border-red-500`}
              >
                {darkMode ? (
                  <FaSun className="text-xl transition-transform hover:scale-150" />
                ) : (
                  <FaMoon className="text-xl transition-transform hover:scale-150" />
                )}
              </button>
            </div>
            <_R_R_D_.Routes>
              <_R_R_D_.Route
                exact
                path={_R_["route-home"]}
                element={
                  <_ProtectedCall
                    onAuth={false}
                    address={
                      <>
                        <_P_.Home />
                      </>
                    }
                  />
                }
              />
              <_R_R_D_.Route
                exact
                path={_R_["route-login"]}
                element={<_ProtectedCall onAuth={false} address={_P_.Login} />}
              />
              <_R_R_D_.Route
                path={_R_["route-register"]}
                element={
                  <_ProtectedCall onAuth={false} address={_RegisterAndLogout} />
                }
              />
              <_R_R_D_.Route
                path={_R_["route-course-allocation"]}
                element={
                  <_ProtectedCall
                    onAuth={true}
                    address={_P_.Course_Allocation}
                  />
                }
              />
              <_R_R_D_.Route
                path={_R_["route-timetable-management"]}
                element={
                  <_ProtectedCall
                    // onAuth={true}
                    // address={_P_.TimeTable}
                    address={<_R_R_D_.Navigate to={_R_.errorPageUrls["404"]} />}
                  />
                }
              />
              <_R_R_D_.Route
                path={`${_R_["route-self-profile-view+<id:number>"]}/${instructorId}`}
                element={
                  <_ProtectedCall
                    onAuth={true}
                    address={
                      <_P_.Instructor_Profile instructorId={instructorId} />
                    }
                  />
                }
              />
              <_R_R_D_.Route
                path={_R_["route-dashboard"]}
                element={
                  <_ProtectedCall onAuth={true} address={_P_.Dashboard} />
                }
              />
              <_R_R_D_.Route
                path={_R_["route-api-button-table"]}
                element={
                  <_ProtectedCall onAuth={true} address={_P_.ApiButtonTable} />
                }
              />
              <_R_R_D_.Route path={$_LOGOUT_ROUTE} Component={_Logout} />
              {/* UNIDENTIFIED PAGE(S) */}
              <_R_R_D_.Route
                path="*"
                element={<_R_R_D_.Navigate to={_R_.errorPageUrls[404]} />}
              />
              {/* ERROR PAGES */}
              <_R_R_D_.Route
                path={_R_["errorPageUrls"][404]}
                Component={_P_.STATUS_PAGES._404}
              />
            </_R_R_D_.Routes>
          </div>
        </_R_R_D_.BrowserRouter>
      </div>
    );
  }
}

function _ProtectedCall({ address: Address, onAuth = null }) {
  return (
    <>
      <_MD_.ProtectedRoute onAuth={onAuth}>
        {!React.isValidElement(Address) ? <Address /> : Address}
      </_MD_.ProtectedRoute>
    </>
  );
}

function _Logout() {
  localStorage_clearLoginCredentials();
  return (
    <>
      <_R_R_D_.Navigate to={_R_["route-login"]} />;
    </>
  );
}

function _RegisterAndLogout() {
  localStorage_clearLoginCredentials();
  return <_P_.Register />;
}

function localStorage_clearLoginCredentials() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER_DATA_OBJECT);
}

export default App;
