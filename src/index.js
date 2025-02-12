import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Chỉ cần một Router ở đây
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
