import React from "react";
import {
  MdArrowBack,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoPrintOutline } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { VscReply } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Mail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { selectedEmail } = useSelector((store) => store.app);
  const { emails } = useSelector((store) => store.app);
  emails.forEach((email) => {
    console.log(email.createdAt);
  });

  const formatDateOrTime = (createdAt) => {
    const emailDate = new Date(createdAt);
    const today = new Date();

    // Check if the email was sent today
    const isToday =
      emailDate.getDate() === today.getDate() &&
      emailDate.getMonth() === today.getMonth() &&
      emailDate.getFullYear() === today.getFullYear();

    if (isToday) {
      // If email was sent today, return the time only
      return emailDate.toLocaleTimeString();
    } else {
      // If email was sent on a different day, return the date
      return emailDate.toLocaleDateString();
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/email/${params.id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const options = [
    {
      icons: <MdArrowBack />,
      onClick: () => navigate("/"),
    },
    {
      icons: <RiInboxArchiveLine />,
    },
    {
      icons: <MdOutlineReport />,
    },
    {
      icons: <RiDeleteBin6Line />,
      onClick: () => {
        deleteHandler();
      },
    },
    {
      icons: <MdOutlineMarkEmailUnread />,
    },
    {
      icons: <MdDriveFileMoveOutline />,
    },
    {
      icons: <IoMdMore />,
    },
  ];
  return (
    <div className="flex-1 bg-[#FFFFFF] p-2 m-4 rounded-lg shadow-md">
      <div className="flex justify-between ml-3">
        <div className="flex items-center gap-4 ">
          <div className="flex gap-1 cursor-pointer">
            {options.map((option, i) => (
              <div
                key={i}
                onClick={option.onClick}
                className="hover:bg-gray-200 p-2 rounded-full cursor-pointer text-lg text-gray-600"
              >
                {option.icons}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="">
            <span>1-50</span>
          </div>
          <div className="flex gap-3">
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
            <MdOutlineKeyboardArrowRight className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="p-5 text-xl">
          <h2>{selectedEmail?.subject}</h2>
        </div>
        <div className=" flex items-center p-5 text-xl gap-3">
          <div className="cursor-pointer">
            <IoPrintOutline />
          </div>
          <div className="cursor-pointer">
            <CiShare1 />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className=" flex-none item-center">
          <div className="flex items-center gap-3 ">
            <div className="text-4xl text-gray-500">
              <CgProfile className="text-gray-400 mt-3" />
            </div>
            <div className="flex items-center gap-2 ">
              <h5>
                <b>{selectedEmail?.to}</b>
              </h5>
              <p className="text-sm text-gray-400">
                &lt;mongodb@alerts.com&gt;
              </p>
            </div>
          </div>
          <div className="flex items-center mx-12 -mt-4">
            <span className="text-gray-400 ">to me</span>
            <FaCaretDown className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className=" items-center flex-none">
            <p>{formatDateOrTime(selectedEmail?.createdAt)}</p>
          </div>
          <div>
            <FaRegStar />
          </div>
          <div>
            <BsEmojiSmile />
          </div>
          <div>
            <VscReply />
          </div>
          <div>
            <IoMdMore />
          </div>
        </div>
      </div>
      <div className="item-center p-3 mx-8">{selectedEmail?.message}</div>
    </div>
  );
};

export default Mail;
