import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";

import { RiInbox2Fill } from "react-icons/ri";
import Emails from "./Emails";
const Inbox = () => {
  const [activate, setactivate] = useState("Primary");
  const InboxMenu = [
    {
      title: "Primary",
      icon: <RiInbox2Fill />,
    },
    {
      title: "Promotions",
      icon: <IoPricetagOutline />,
    },
    {
      title: "Social",
      icon: <FaUserFriends />,
    },
  ];
  return (
    <div className="flex-1 bg-[#FFFFFF] p-2 m-4 rounded-lg shadow-md">
      <div className="flex justify-between ml-3">
        <div className="flex items-center gap-4 ">
          <div className="flex gap-1 cursor-pointer">
            <input
              type="checkbox"
              className="hover:bg-gray-200 p-3 rounded-full cursor-pointer"
            ></input>
            <FaCaretDown className="hover:bg-gray-200 py-2 rounded-full text-2xl" />
          </div>
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full">
            <IoReloadOutline />
          </div>
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="">
            <span>1-50 of 292</span>
          </div>
          <div className="flex gap-3">
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
            <MdOutlineKeyboardArrowRight className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3">
        {InboxMenu.map((data, index) => (
          <div
            key={index}
            className={`flex items-center gap-5 text-md w-60 cursor-pointer ${
              activate === data.title ? "MenuBorder" : ""
            }`}
            onClick={() => setactivate(data.title)}
          >
            <h3>{data.icon}</h3>
            <h1>{data.title}</h1>
          </div>
        ))}
      </div>
      <Emails></Emails>
    </div>
  );
};

export default Inbox;
