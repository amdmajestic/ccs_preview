import Home from './Home'
import Login from './Login'
import Register from './Register'
import Course_Allocation from './Course_Allocation'
import Instructor_Profile from './Instructor_Profile'
import Dashboard from './Dashboard'

import STS_404_NotFound from "./status-pages/STS_404_NotFound";

const _PAGES_ = {
    Home,
    Login,
    Register,
    Dashboard, 
    Course_Allocation,
    Instructor_Profile,
    STATUS_PAGES: {
        _404: STS_404_NotFound,
    },
}


export default _PAGES_;