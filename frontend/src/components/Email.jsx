import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedEmail } from "../redux/appSlice";
const Email = ({ emails }) => {
  console.log(emails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(setSelectedEmail(emails));
    navigate(`/mail/${emails._id}`);
  };

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
  return (
    <div
      onClick={openMail}
      className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <input type="checkbox"></input>
        <FaRegStar />
      </div>

      <div className="flex items-center gap-[80px] ml-2">
        <h3 className="-ml-16">{emails?.subject}</h3>
        <p>{emails?.message}</p>
      </div>
      <div>{formatDateOrTime(emails?.createdAt)}</div>
    </div>
  );
};

export default Email;
