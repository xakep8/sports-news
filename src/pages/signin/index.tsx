import React from "react";
// Just import the file
import SigninForm from "./SigninForm";

const Signin: React.FC = () => {
  // And use it after the h1 tag
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign in
        </h1>
        <SigninForm />
      </div>
    </div>
  );
};
export default Signin;
