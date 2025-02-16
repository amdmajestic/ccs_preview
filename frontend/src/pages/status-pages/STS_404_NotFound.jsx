import React from 'react';
import { default as _R_ } from '/src/directives/references.routes';
import { NavLink } from 'react-router-dom';

const STS_404_NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      <h2 className="text-4xl font-semibold mb-6">404 - Page Not Found</h2>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <NavLink
        to={_R_['route-redirect-app']}
        replace
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-200"
      >
        Go Back Home
      </NavLink>
    </div>
  );
};

export default STS_404_NotFound;
