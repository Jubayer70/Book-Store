import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth';
import { useDispatch,useSelector } from "react-redux";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role); 

  return (
    <div className="bg-[#0A1828] p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center w-full">
          <img src={data.avatar} className="h-[12vh]" />
          <p className="mt-3 text-xl text-[#FFD700] font-semibold">
            {data.username}
          </p>
          <p className="mt-1 text-normal text-[#FFD700]">
            {data.email}
          </p>
          <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>  
      </div>
      {role === "user" && (
        <div className="w-full flex flex-col items-center justify-center lg:flex">
            <Link
              to="/profile"
              className="text-[#FFD700] font-semibold w-full py-2 text-center hover:bg-blue-500 rounded transition-all duration-300"
            >
              Favourites
            </Link>

            <Link
              to="/profile/orderHistory"
              className="text-[#FFD700] font-semibold w-full py-2 mt-4 text-center hover:bg-blue-500 rounded transition-all duration-300"
            >
            Order History
            </Link>

            <Link
              to="/profile/settings"
              className="text-[#FFD700] font-semibold w-full py-2 mt-4 text-center hover:bg-blue-500 rounded transition-all duration-300"
            >
            Settings
            </Link>
      </div>
      )}
      {role === "admin" && (
          <div className="w-full flex flex-col items-center justify-center lg:flex">
            <Link
              to="/profile"
              className="text-[#FFD700] font-semibold w-full py-2 text-center hover:bg-blue-500 rounded transition-all duration-300"
            >
              All Request
            </Link>

            <Link
              to="/profile/add-book"
              className="text-[#FFD700] font-semibold w-full py-2 mt-4 text-center hover:bg-blue-500 rounded transition-all duration-300"
            >
              Add Books
            </Link>
         </div>
      )}
      <button className="bg-blue-600 w-3/6 lg:w-full mt-4 lg:mt-0 text-[#FFD700] font-semibold flex items-center justify-center py-2 rounded hover:bg-red-600 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
       }}
      >
        Log Out <FaArrowRight className="ms-4" />
      </button>
    </div>
  )
}

export default Sidebar;
