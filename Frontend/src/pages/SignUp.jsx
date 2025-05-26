import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const navigate = useNavigate();
  
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.contact === "" || Values.address === "") {
        alert("All Fields are required");
      }
      else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up",
          Values
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    }
    catch (error) {
       alert(error.response.data.message);
    }
  }; 

  return (
    <div className="h-auto bg-[#0A1828] px-12 py-8 flex items-center justify-center">
      <div className="bg-[#0A1828] rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 border-4 border-[#FFD700]">
        <p className="text-[#FFD700] text-xl">Sign Up</p>
        <div className="mt-1">
          <label className="text-[#FFD700]">
            Username
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none border border-[#FFD700]"
            placeholder="username"
            name="username"
            required
            value={Values.username}
            onChange={change}
          />
        </div>
        <div className="mt-1">
          <label className="text-[#FFD700]">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none border border-[#FFD700]"
            placeholder="abc@gamil.com"
            name="email"
            required
            value={Values.email}
            onChange={change}
          />
        </div>
        <div className="mt-1">
          <label className="text-[#FFD700]">
            Password
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none border border-[#FFD700]"
            placeholder="password"
            name="password"
            required
            value={Values.password}
            onChange={change}
          />   
        </div>
        <div className="mt-1">
          <label className="text-[#FFD700]">
           Contact Number
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none border border-[#FFD700]"
            placeholder="contact"
            name="contact"
            required
            value={Values.contact}
            onChange={change}
          />   
        </div>
        <div className="mt-1">
          <label className="text-[#FFD700]">
           Address
          </label>
          <textarea
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none border border-[#FFD700]"
            rows="5"
            placeholder="address"
            name="address"
            required
            value={Values.address}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-[#FFD700] text-[#0A1828] font-semibold py-2 rounded hover:bg-[#e6c200] border border-[#FFD700]">
            SignUP
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-[#FFD700] font-semibold"> Or </p>
        <p className="flex mt-4 items-center justify-center text-[#FFD700] font-semibold">
          Already have an account? &nbsp;  
          <Link to="/login" className="hover:text-blue-500">
            <u>Log_In</u>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;
