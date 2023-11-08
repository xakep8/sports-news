import React from "react";
// Just import the file
import ResetForm from "./ResetForm";

const Signin: React.FC = () => {
  // And use it after the h1 tag
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Reset Password
        </h1>
        <ResetForm />
      </div>
    </div>
  );
};
export default Signin;
