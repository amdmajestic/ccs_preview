import React from 'react';

const STS_404_NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      <h2 className="text-4xl font-semibold mb-6">404 - Page Not Found</h2>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <a 
        href="/" 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default STS_404_NotFound;
