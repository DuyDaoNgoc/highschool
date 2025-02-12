import React from "react";
import { Route, Navigate } from "react-router-dom";

// PrivateRoute nhận vào element và các props khác để kiểm tra quyền truy cập
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("username"); // Kiểm tra xem người dùng đã đăng nhập chưa

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
