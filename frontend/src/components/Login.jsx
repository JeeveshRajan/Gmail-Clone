import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/appSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        console.log(res.data.user);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen mt-10 ">
      <div className=" w-[30%] bg-[#ffff] shadow-md p-3 rounded-md">
        <h1 className="font-bold text-2xl mb-4">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            className="p-2 border zinc-400 mb-4 outline-none"
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="p-2 border zinc-400 mb-4 outline-none"
          />
          <button type="submit" className="bg-[#000] p-2 text-white uppercase">
            Submit
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
