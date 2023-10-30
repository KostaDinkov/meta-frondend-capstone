import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Routes/Home";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookingPage from "./Routes/BookingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <div>404 Not found</div>,
  },
  {
    path: "/booking",
    element: <BookingPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
