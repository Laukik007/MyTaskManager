import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
	// change true with is login redux
	return true ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
