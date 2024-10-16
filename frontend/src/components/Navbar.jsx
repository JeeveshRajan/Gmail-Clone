import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FcFilledFilter } from "react-icons/fc";
import { GoQuestion } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = useSelector((store) => store.app);
  const [text, setText] = useState("");
  const defaultProfilePhoto =
    "https://imgs.search.brave.com/6WjbriDjdrnstBg5RoQlYwczwt6ilhSajnRHB8gd_HM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMnY1/ZHpoZGc0emh4My5j/bG91ZGZyb250Lm5l/dC93ZWItYXNzZXRz/L2ltYWdlcy9zdG9y/eXBhZ2VzL25ldy9w/cm9maWxlLXBpY3R1/cmUvcHJvZmlsZS0y/LmpwZw";

  console.log(`printing data from navbar${user}`);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text]);
  return (
    <div className="flex items-center justify-around mx-1 h-16 gap-20">
      <div className="flex-auto items-center gap-19 p-3">
        <div className="flex items-center gap-4">
          <div
            className="hover:bg-gray-200 p-3 rounded-full"
            style={{ cursor: "pointer" }}
          >
            <RxHamburgerMenu fontSize={"22px"} />
          </div>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png"
            width={"110px"}
            height={"120px"}
            style={{ cursor: "pointer" }}
          ></img>
        </div>
      </div>

      <div className="w-[60%]">
        <div className="bg-[#EAF1FB] rounded-full flex items-center p-2 mx-2">
          <IoIosSearch className="text-gray-600 " size={"24px"} />
          <input
            style={{ backgroundColor: "transparent" }}
            type={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-10 p-2 focus:outline-none"
            placeholder="Search Mail"
          />
          <div style={{ cursor: "pointer" }}>
            <FcFilledFilter size={"24px"} />
          </div>
        </div>
      </div>

      <div className="flex items-center" style={{ cursor: "pointer" }}>
        <div className="hover:bg-gray-200 p-2 rounded-full">
          <GoQuestion className="text-gray-600 " size={"25px"} />
        </div>
        <div className="hover:bg-gray-200 p-2 rounded-full">
          <IoSettingsOutline className="text-gray-600 " size={"25px"} />
        </div>
        <div className="hover:bg-gray-200 p-2 rounded-full">
          <PiDotsNineBold className="text-gray-600" size={"25px"} />
        </div>

        <div>
          <h3 className="underline cursor-pointer" onClick={logoutHandler}>
            Logout
          </h3>
        </div>
        <div className="p-2">
          <Avatar src={defaultProfilePhoto} size={"34px"} round={true} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
