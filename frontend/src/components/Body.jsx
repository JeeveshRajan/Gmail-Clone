import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Body = () => {
  const { user } = useSelector((store) => store.app);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Body;
