import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Sign = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen mt-10 ">
      <div className=" w-[30%] bg-[#ffff] shadow-md p-3 rounded-md">
        <h1 className="font-bold text-2xl mb-4">SIGNUP</h1>
        <form onSubmit={submitHandler} className="flex flex-col">
          <input
            onChange={handleChange}
            value={input.fullname}
            name="fullname"
            type="text"
            placeholder="Name"
            className="p-2 border zinc-400 mb-4 outline-none"
          />
          <input
            onChange={handleChange}
            value={input.email}
            name="email"
            type="email"
            placeholder="Email"
            className="p-2 border zinc-400 mb-4 outline-none"
          />
          <input
            onChange={handleChange}
            value={input.password}
            name="password"
            type="password"
            placeholder="Password"
            className="p-2 border zinc-400 mb-4 outline-none"
          />
          <button type="submit" className="bg-[#000] p-2 text-white uppercase">
            Submit
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Sign;
