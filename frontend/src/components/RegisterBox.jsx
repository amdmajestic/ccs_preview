import React, { useState } from 'react';

const RegisterBox = () => {
  // State to track if registration was successful
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulate registration success after 2 seconds
  const handleRegister = () => {
    setTimeout(() => {
      setIsSuccess(true);
    }, 2000); // Simulate a 2-second delay for registration
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Account</h2>

        <button 
          onClick={handleRegister} 
          className="w-full py-3 px-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Register Now
        </button>

        {isSuccess && (
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-lg shadow-md">
            <p className="font-semibold text-lg">Success!</p>
            <p className="text-sm">Your registration was successful. You can now log in with your credentials.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterBox;
