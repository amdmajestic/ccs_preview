import React, { useState, useEffect } from 'react';

const SuccessAlert = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Hide the alert after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(false); // Close the alert
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    const closeAlert = () => {
        setIsVisible(false); // Close the alert immediately when the close button is clicked
    };

    return (
        <>
        {isVisible && (
            <div
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-lg p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-between transition-all duration-300"
            >
            <div className="flex items-center">
                <span className="text-xl">✓</span>
                <p className="ml-2 text-lg font-semibold">Registration successful!</p>
            </div>
            {/* Close Button (cross) */}
            <button
                onClick={closeAlert}
                className="text-white text-2xl font-bold ml-4"
            >
                &times;
            </button>
            </div>
        )}
        </>
    );
};

export default SuccessAlert;
