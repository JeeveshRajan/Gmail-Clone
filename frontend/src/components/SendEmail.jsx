import React, { useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineFormatColorText } from "react-icons/md";
import { MdAttachFile } from "react-icons/md";
import { MdInsertLink } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { MdAddToDrive } from "react-icons/md";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { MdOutlineLockClock } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setEmails, setOpen } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";

const SendEmail = () => {
  const { open, emails } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/email/create",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setEmails([...emails, res.data.email]));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    // dispatch(addEmail(form))
    setForm({ to: "", subject: "", message: "" });
    dispatch(setOpen(false));
    console.log(setForm);
  };
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-[#FFFFFF] shadow-lg w-[500px] rounded-lg`}
    >
      <div className="flex justify-between items-center p-2 bg-[#F2F6FC] border-b border-zinc-400">
        <div className="">
          <h4>New Message</h4>
        </div>
        <div className="flex items-center gap-2 ">
          <div>
            <IoRemoveOutline className="font-extrabold cursor-pointer" />
          </div>
          <div>
            <AiOutlineArrowsAlt className="font-extrabold cursor-pointer" />
          </div>
          <div>
            <RxCross2
              className="font-extrabold cursor-pointer"
              onClick={() => dispatch(setOpen(false))}
            />
          </div>
        </div>
      </div>
      <div className="border-b border-zinc-400">
        <form onSubmit={handleOnSubmit} className="flex p-2">
          <label for="to" className="mr-2 text-gray-500">
            To
          </label>
          <input
            type="text"
            name="to"
            value={form.to}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </form>
      </div>
      <div className="border-b border-zinc-400">
        <form className="flex p-2">
          <label for="to" className="mr-2 text-gray-500">
            Subject
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={handleChange}
            name="subject"
            className="w-full outline-none"
          />
        </form>
      </div>

      <div>
        <textarea
          onChange={handleChange}
          value={form.message}
          name="message"
          className="w-full h-60 outline-none p-2"
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <div className="flex items-center p-2 justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#065fd3] p-1 px-3 rounded-full">
            <form onSubmit={handleOnSubmit}>
              <button
                type="submit"
                className="text-white border-r border-zinc-900 pr-1"
              >
                Send
              </button>
            </form>
            <MdOutlineKeyboardArrowDown className="text-white" />
          </div>
          <div>
            <MdOutlineFormatColorText className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <MdAttachFile className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <MdInsertLink className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <BsEmojiSmile className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <MdAddToDrive className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <MdOutlineInsertPhoto className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <MdOutlineLockClock className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <FaPenAlt className="cursor-pointer text-zinc-600" />
          </div>
          <div>
            <BsThreeDotsVertical className="cursor-pointer text-zinc-600" />
          </div>
        </div>

        <div>
          <RiDeleteBin6Line className="cursor-pointer text-zinc-600" />
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
