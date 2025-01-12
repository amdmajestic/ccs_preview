import React, { Component, Suspense, useEffect } from "react";
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA_OBJECT} from '/src/functions/constants';
import "./App.css";

import * as _R_R_D_ from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons
import { default as _P_ } from './pages/__pages_traits';
import { default as _C_ } from "./components/__components_traits";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      instructorId: "",
    };
  }

  componentDidMount() {
    const sessionalDarkMode = sessionStorage.getItem('ccs_darkTheme');
    if(sessionalDarkMode === null) {
      sessionStorage.setItem('ccs_darkTheme', this.state.darkMode);
    } else {
      const sessionalDarkModeBool = sessionalDarkMode.stringToBool();
      document.documentElement.classList.toggle("dark", sessionalDarkModeBool);
      this.setState({darkMode: sessionalDarkModeBool});
    }
  }

  // reloadComponent() {
  //   window.location.reload();
  // }
    
  RouteWatcher = () => {
    _R_R_D_.useLocation();

    useEffect(() => {
      let user_obj = localStorage.getItem(USER_DATA_OBJECT);
      if(user_obj) {
        user_obj = JSON.parse(user_obj);
        const { id: user_id } = user_obj.user;
        this.setState({instructorId: user_id});
      }
    }, [localStorage.getItem(USER_DATA_OBJECT)])
    

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
      sessionStorage.setItem('ccs_darkTheme', newDarkMode);
      return { darkMode: newDarkMode };
    });
  };
  

  // Render method where JSX is returned
  render() {
    const { darkMode, instructorId } = this.state;

    return (
      <div className="min-h-screen w-full flex flex-col justify-self-center">
        <_R_R_D_.BrowserRouter>          
          <this.RouteWatcher />
          <_C_.Header />
          <div
            className={`${darkMode ? "bg-dark-bg" : "bg-light-gray"} transition duration-300`}
          >
            {/* Theme Toggle Button */}
            <div
              className="relative p-2 backdrop-blur-xl bg-orange-50 dark:bg-slate-500 bg-opacity-30 shadow-lg flex justify-end"
            >
              <button
                onClick={this.toggleTheme}
                className={`p-4 rounded-full transition-all duration-300 flex items-center justify-center 
                  ${darkMode ? "bg-indigo-400 text-red-300" : "bg-blue-300 text-slate-800"} 
                  backdrop-blur-md bg-opacity-60 shadow-md hover:bg-opacity-40 border hover:border-teal-950 dark:hover:border-red-500`}
              >
              {darkMode ? <FaSun className="text-xl transition-transform hover:scale-150"/> : <FaMoon className="text-xl transition-transform hover:scale-150"/>}
            </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <_R_R_D_.Routes>
                <_R_R_D_.Route
                  index
                  element={<_ProtectedCall 
                            onAuth={false} 
                            address={
                              <>
                                <_P_.Home />
                              </>
                            }
                          />}
                />
                <_R_R_D_.Route
                  exact
                  path="/login"
                  element={<_ProtectedCall 
                              onAuth={false} 
                              address={_P_.Login}
                          />}
                />
                <_R_R_D_.Route
                  path="/register"
                  element={<_ProtectedCall 
                              onAuth={false} 
                              address={_RegisterAndLogout}
                          />}
                />
                <_R_R_D_.Route
                  path="/course-allocation"
                  element={<_ProtectedCall
                            onAuth={true} 
                            address={_P_.Course_Allocation}
                          />}
                />
                <_R_R_D_.Route
                  path="/timetable-management"
                  element={<_ProtectedCall
                            onAuth={true} 
                            address={<_R_R_D_.Navigate to={"/404-NotFound"} />}
                          />}
                />
                <_R_R_D_.Route
                  path={"/instructor/profile/"+instructorId}
                  element={<_ProtectedCall 
                              onAuth={true} 
                              address={<_P_.Instructor_Profile instructorId={instructorId} />} 
                            />}
                />
                <_R_R_D_.Route
                  path="/dashboard"
                  element={<_ProtectedCall 
                            onAuth={true} 
                            address={_P_.Dashboard}
                          />}
                />
                <_R_R_D_.Route
                  path={$_LOGOUT_ROUTE}
                  Component={_Logout}
                />
                <_R_R_D_.Route path="*" Component={_P_.STATUS_PAGES._404} />
              </_R_R_D_.Routes>
            </Suspense>
          </div>
        </_R_R_D_.BrowserRouter>
      </div>
    );
  }
}

function _ProtectedCall({ address: Address, onAuth }) {
  return (
    <>
      <_C_.ProtectedRoute onAuth={onAuth} >
        {!React.isValidElement(Address) ? <Address /> : Address}
      </_C_.ProtectedRoute>
    </>
  );
}

function _Logout() {
  localStorage_clearLoginCredentials();
  return <>
    <_R_R_D_.Navigate to="/login" />;
  </> 
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
