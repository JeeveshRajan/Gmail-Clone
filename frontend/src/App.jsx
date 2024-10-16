import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Inbox from "./components/Inbox";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Body from "./components/Body";
import Mail from "./components/Mail";
import SendEmail from "./components/SendEmail";
import Login from "./components/Login";
import Sign from "./components/Sign";

import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      { path: "/mail/:id", element: <Mail /> },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Sign></Sign>,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <div className="absolute right-10 bottom-0 z-10">
        <SendEmail></SendEmail>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
