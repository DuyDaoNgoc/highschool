import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HighSchool from "./routes/Highschool";
import Footer from "./routes/footer";
import Login from "./routes/login";
import Dashboard from "./Dashboard";
import Menu from "./data/nav_menu";
import Register from "./routes/register";
import Courses from "./routes/Courses";
import Loading from "./data/loading";
import NetworkError from "./data/NetworkError";
import CustomerInfo from "./routes/CustomerInfo";
import SaveCategory from "./routes/Save-Category";
import ProductDetails from "./routes/thong-sanpham";
import Instructors from "./routes/instructors";
import ProjectsUser from "./routes/user";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const location = useLocation();

  const checkNetworkStatus = () => {
    setIsNetworkError(!navigator.onLine);
  };

  useEffect(() => {
    checkNetworkStatus();
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  const excludedPaths = ["/", "/login", "/register"];
  const shouldShowGlobalLoadingOrError = !excludedPaths.includes(
    location.pathname
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HighSchool />} />

        <Route
          path="/Courses"
          element={
            <>
              <Menu />
              <Courses />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Menu />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Menu />
              <Register />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Menu />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/CustomerInfo"
          element={
            <>
              <Menu />
              <CustomerInfo
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isNetworkError={isNetworkError}
              />
            </>
          }
        />
        <Route
          path="/Save-Category"
          element={
            <>
              <Menu />
              <SaveCategory
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isNetworkError={isNetworkError}
              />
            </>
          }
        />

        <Route
          path="/instructors"
          element={
            <>
              <Menu />
              <Instructors
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isNetworkError={isNetworkError}
              />
            </>
          }
        />
        <Route path="/thong-sanpham/:id" element={<ProductDetails />} />
        <Route
          path="/user"
          element={
            <>
              <Menu />
              <ProjectsUser
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isNetworkError={isNetworkError}
              />
            </>
          }
        />
      </Routes>

      {shouldShowGlobalLoadingOrError && isLoading && <Loading />}
      {shouldShowGlobalLoadingOrError && isNetworkError && !isLoading && (
        <NetworkError />
      )}

      <Footer />
    </div>
  );
}

export default App;
