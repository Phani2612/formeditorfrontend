import React from 'react';

const Success = ({ totalScore }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          Congratulations on Completing the Test!
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Thank you for your responses! We will evaluate your results and get back to you soon.
        </p>
        
        <div className="mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
