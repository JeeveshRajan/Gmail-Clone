import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RiInbox2Fill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { MdOutlineContactPage } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";
const SideBar = () => {
  const [active, setactive] = useState("Inbox");
  console.log(active);

  const menuItems = [
    {
      name: "Inbox",
      icon: <RiInbox2Fill />,
    },
    {
      name: "Starred",
      icon: <FaRegStar />,
    },
    {
      name: "Snoozed",
      icon: <IoMdTime />,
    },
    {
      name: "Sent",
      icon: <VscSend />,
    },
    {
      name: "Drafts",
      icon: <MdOutlineContactPage />,
    },
    {
      name: "More",
      icon: <MdExpandMore />,
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className="mt-3 w-64 m-0 ">
      <div
        className="flex items-center gap-2 ml-4 mb-4 bg-[#C2E7FF] p-4 rounded-full w-2/3 justify-center box"
        onClick={() => dispatch(setOpen(true))}
      >
        <LuPencil />
        <button>
          <h3>Compose</h3>
        </button>
      </div>

      <div>
        {menuItems.map((data, i) => (
          <div
            key={i}
            className={`flex items-center gap-5 cursor-pointer mb-2 pl-7
           
            ${
              active === data.name
                ? "bg-[#D3E3FD] rounded-r-full border-blue-500 p-1 font-bold"
                : "font-thin hoverEffectForAllMenu text-slate-500"
            }`}
            onClick={() => setactive(data.name)}
          >
            {data.icon}
            <p>{data.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
