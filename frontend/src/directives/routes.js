const { VITE_BASE_URL } = import.meta.env;

const __ROUTES__ = {
  "route-home": "/",
  "route-login": "/login",
  "route-register": "/register",
  "route-course-allocation": "/course-allocation",
  "route-timetable-management": "/timetable-management",
  "route-dashboard": "/dashboard",
  "route-self-profile-view": "/instructor/profile/",
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

// processRoutes(__ROUTES__);

export default __ROUTES__;

export { VITE_BASE_URL as BASE_URL};
