import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

function Authenticate() {
	let isAuthenticated = true;
	if (localStorage.getItem("username") !== null) {
	  isAuthenticated = false;
	}
  return isAuthenticated ?<Navigate to="/" /> : <Outlet />;
}

export default Authenticate