import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../Loaders/Loader';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }
  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite", {}, { headers });
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, { headers })
    alert(response.data.message);
  };
  const deleteServices = async () => {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  }

  return (
    <>
      {Data ? (
        <div
          className="px-4 md:px-12 py-8 flex flex-col md:flex-row gap-8 items-start"
          style={{
            backgroundColor: "#0A1828",
            border: "4px solid gold",
            borderRadius: "16px",
            boxSizing: "border-box"
          }}
        >
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col md:flex-row justify-around p-6 md:p-12 rounded" style={{ backgroundColor: "#0A1828" }}>
              <div
                style={{
                  border: "4px solid gold",
                  borderRadius: "12px",
                  display: "inline-block",
                  padding: "4px",
                  background: "#1a2636"
                }}
              >
                <img
                  src={Data.url}
                  alt='/'
                  className="max-h-[50vh] lg:max-h-[70vh] rounded object-cover mb-4 md:mb-0"
                />
              </div>
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col gap-4 md:gap-8 mt-4 md:mt-0">
                  <button className="bg-white rounded-full text-3xl p-3 text-red-700 hover:bg-red-100 transition duration-300" onClick={handleFavourite}>
                    <FaHeart />
                  </button>
                  <button className="bg-white rounded-full text-3xl p-3 text-blue-700 hover:bg-blue-100 transition duration-300 flex items-center" onClick={handleCart}>
                    <FaCartPlus />
                    <span className="ml-2 block md:hidden text-sm">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col gap-4 md:gap-8 mt-4 md:mt-0">
                  <Link
                    to={`/updatebook/${id}`}
                    className="bg-white rounded-full text-3xl p-3 text-red-700 hover:bg-red-100 transition duration-300"
                  >
                    <FaEdit />
                  </Link>
                  <button className="bg-white rounded-full text-3xl p-3 text-blue-700 hover:bg-blue-100 transition duration-300 flex items-center" onClick={deleteServices}>
                    <MdOutlineDelete />{" "}
                    <span className="ml-2 block md:hidden text-sm">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full lg:w-1/2">
            <h1 className="text-4xl font-semibold" style={{ color: "gold" }}>{Data.title}</h1>
            <p className="mt-4 text-xl" style={{ color: "gold" }}>{Data.author}</p>
            <p className="mt-4 text-xl" style={{ color: "gold" }}>{Data.desc}</p>
            <p className="mt-4 text-xl" style={{ color: "gold" }}>{Data.language}</p>
            <p className="mt-4 text-3xl font-semibold" style={{ color: "gold" }}>
              Price : ৳ {Data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center" style={{ backgroundColor: "#0A1828" }}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default  ViewBookDetails;
