import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Routes/Home";
import Master from "./Routes/Master/Index";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookingPage from "./Routes/BookingPage";
import ApiProvider from "./Context/FakeApiContext";
import ConfirmedBooking from "./Routes/ConfirmedBooking";
import OverlayProvider from "./Context/OverlayContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    errorElement: <div>404 Not found</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "booking",
        element: <BookingPage />,
        children: [],
      },
      {
        path: "confirmation",
        element: <ConfirmedBooking />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </ApiProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
