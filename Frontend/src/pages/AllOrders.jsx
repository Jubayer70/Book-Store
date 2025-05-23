import React ,{ useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loaders/Loader';
import { FaUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';


const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Option, setOption] = useState(-1);
  const [Values, setValues] = useState({status: ""});
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
    setAllOrders(response.data.data);
    console.log(response.data.data);
    };
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };
  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    alert(response.data.message);
  };
  
  // const setOptionButton = (i) => {
  //   setOption(i);
  // }
  // AllOrders && AllOrders.splice(AllOrders.length - 1, 1);
  return (
    <>
      {!AllOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-900 mb-8">
            All Order History
          </h1>
          <div className="mt-4 bg-[#0A1828] w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center text-white">Sr.</h1> 
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="text-white">Book</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="text-white">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="text-white">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="text-white">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="text-white">
                <FaUser />
              </h1>
            </div>
        </div>
        {AllOrders.map((items, i) => (
          <div key={i} className="bg-zinc-200 w-full rounded py-2 px-4 flex gap-4 ">
                <div className="w-[3%]">
                  <h1 className="text-center text-black">{i+1}</h1>
                </div>
                <div className="w-[22%]">
                  {items.book && (
                    <Link to={`/view-book-details/${items.book._id}`}
                      className="hover:text-blue-300 text-black">
                        {items.book.title}
                    </Link>
                  )}
                </div>
                <div className="w-[45%]">
                  <h1 className="text-black">{items.book ? items.book.desc.slice(0, 50) : ''}...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1 className="text-black">{items.book ? `৳ ${items.book.price}` : ''}</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="font-semibold text-black">
                <button className="hover:scale-105 transition-all duration-300 text-black" onClick={()=> setOption(i)}>
                  {items.status === "Order Placed" ? (
                    <div className="text-blue-500">{items.status}</div>
                  ) : items.status === "Out For Delivery" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Delivered" ? (
                    <div className="text-green-500">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (items.status)}
                </button>
                <div className={`${Option === i ? "flex" : "hidden"}`}>
                  <select name='status' id='' className='bg-gray-200 text-black'
                    onChange={change}
                    value = {Values.status}
                  >
                      {
                        [
                          "Order Placed",
                          "Out For Delivery",
                          "Delivered",
                          "Canceled",
                        ].map((items,i) =>(
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))
                      }
                    </select>
                    <button className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOption(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
              </h1>
            </div>
            <div className="w-[10%] md:w-[15%]">
              <button
                className="text-xl hover:text-orange-500 text-black"
                onClick={() => {
                  setuserDiv("fixed");
                  setuserDivData(items.user);
                }}>
                <IoOpenOutline />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {userDiv && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />   
      )}
    </>
  )
}

export default AllOrders;