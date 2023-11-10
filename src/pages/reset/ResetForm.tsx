import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

interface FormValues {
  current_password: string;
  new_password: string;
}

const ResetForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
        const token=localStorage.getItem('authToken')??"";
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json" ,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Password reset failed");
      }

      console.log("Password reset successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Current Password:</label>
        <input
          type="password"
          id="current_password"
          {...register("current_password", { required: true })}
          className="w-full border rounded-md py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          New Password:
        </label>
        <input
          type="password"
          id="new_password"
          {...register("new_password", { required: true })}
          className="w-full border rounded-md py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetForm;
