import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const FormPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const { OID } = useParams();

  const storeinLocal = () => {
    localStorage.setItem("User_Email", email);
    localStorage.setItem("User_Phone", phone);
  };

  // Check if both email and phone are entered
  const isFormValid = email !== "" && phone !== "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        User Information
      </h1>
      <form>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
  
        {/* Phone Input */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
  
        {/* Next Button */}
        {isFormValid ? (
          <Link
            to={`/question/${OID}`}
            className={`block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={storeinLocal}
          >
            Next
          </Link>
        ) : null}
      </form>
    </div>
  </div>
  );
};

export default FormPage;
