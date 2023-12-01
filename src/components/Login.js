// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SubmitButton from "./SubmitButton";
import { createAPIEndPoint, ENDPOINT } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createAPIEndPoint(ENDPOINT.login).post({
        userName: username,
        password: password,
      });
      if(response.status==200)
      await localStorage.setItem('username', username);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen font-mono flex items-center justify-center"
      id="background"
    >
      <div className="max-w-md w-full m-4 p-6 bg-white rounded-lg border border-r-4 border-b-4 border-gray-700 shadow-md">
        <div className="bg-gray-300 p-0.5 rounded-lg border border-r-4 border-b-4 border-gray-700  mb-6 flex justify-center items-center">
          <div className="border-2 border-white p-3 flex-1 border-r-0 border-b-0 rounded-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Login
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:border-2"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:border-2"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <SubmitButton name="Login" />
            <div className="text-blue-500 hover:underline">
              Forgot Password?
            </div>
          </div>
        </form>
        <div className="flex justify-center items-center">
          Don't have account?{" "}
          <div
            onClick={() => {
              navigate("/signup");
            }}
            className="ml-2 text-blue-500 hover:underline"
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
