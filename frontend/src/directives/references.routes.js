import { USER_DATA_OBJECT } from "../functions/constants";
const { VITE_BASE_URL } = import.meta.env;

const __DEF_ROUTES__ = {
  "route-home": "/",
  "route-dashboard": "/dashboard",
}

const __ROUTES__ = {
  "route-redirect-app": (localStorage.getItem(USER_DATA_OBJECT)
    ? __DEF_ROUTES__["route-dashboard"]
    : __DEF_ROUTES__["route-home"]),
  "route-home": ( __DEF_ROUTES__["route-home"]),
  "route-login": "/login",
  "route-register": "/register",
  "route-course-allocation": "/course-allocation",
  "route-timetable-management": "/timetable-management",
  "route-dashboard":  (__DEF_ROUTES__["route-dashboard"]),
  "route-self-profile-view+<id:number>": "/instructor/profile",
  "route-api-button-table": "/api-button-table",
  // {
  //     declare:
  //     "/instructor/profile/",
  //     approach:
  //     "/instructor/profile/",
  // },

  errorPageUrls: {
    404: "/404-NotFound",
  },
};

// function processRoutes(routesObj) {
//   for (const routeKey in routesObj) {
//     let route = routesObj[routeKey];

//     if (typeof route === "string") {
//       route = route.trim();

//       if (route !== "/" && route !== "\\" && route !== "") {
//         if (route[0] !== "/" && route[0] !== "\\") {
//           routesObj[routeKey] = VITE_BASE_URL + "/" + route;
//         } else {
//           routesObj[routeKey] = VITE_BASE_URL + route;
//         }
//       } else {
//         routesObj[routeKey] = VITE_BASE_URL;
//       }
//     } else if (typeof route === "object" && route !== null) {
//       processRoutes(route);
//     }
//   }
// }

function processRoutes(routesObj) {
  // Check if the input is an object (to ensure we recurse on nested objects)
  for (const routeKey in routesObj) {
    const indexPaths = ["/", "\\", ""];
    let route = routesObj[routeKey];
    let base_url = indexPaths.includes(VITE_BASE_URL[0]) ? VITE_BASE_URL.slice(1) : VITE_BASE_URL;
    base_url = base_url.trim();    
    base_url = indexPaths.includes(base_url[base_url.length-1]) ? base_url.substring(0, base_url.length-1) : base_url;
    

    if (typeof route === "string") {
      route = route.trim();

      // Modify the route based on the conditions
      if (!indexPaths.includes(base_url)) {
        if (indexPaths.includes(route)) {
          routesObj[routeKey] = base_url;          
        } else if (!indexPaths.includes(route[0])) {
          routesObj[routeKey] = base_url + "/" + route;
        } else {
          routesObj[routeKey] = base_url + route;
        }
      } else {
        routesObj[routeKey] = base_url;
      }
    } else if (typeof route === "object" && route !== null) {
      // Recursively process nested objects
      routesObj[routeKey] = processRoutes(route);
    }
  }

  return routesObj; // Return the modified object after processing
}


function processAndCloneRoutes() {
  return processRoutes(structuredClone(__ROUTES__));
}

// processRoutes(__ROUTES__);

export default __ROUTES__;

export { 
  VITE_BASE_URL as BASE_URL, 
  processAndCloneRoutes,
};
