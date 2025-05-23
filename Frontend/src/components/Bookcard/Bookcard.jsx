import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"

const Bookcard = ({data,favourite}) => {
    const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
    };
  // console.log(data);
    const handleRemoveBooks = async () => {
      const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favourite",
      {},
      { headers }
      );
      alert(response.data.message);
    };
  return (
    <div className="bg-yellow-400 rounded p-2 flex flex-col">
      <Link to ={`/view-book-details/${data._id}`}>
        <div className='bg-[#0A1828] rounded p-4'>
          <div className="bg-white rounded flex items-center justify-center">
            <img src={data.url} alt='/' className="h-[25vh]"/>
          </div>
          <h2 className="mt=4 text-xl text-yellow-400">{data.title} </h2>
          <p className="mt-4 text-yellow-400 font-semibold">{data.author}</p>
          <p className="mt-4 text-white font-semibold"> ৳ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button 
            className="bg-red-600 px-4 py-2 rounded border border-green-300 text-white"
            onClick={handleRemoveBooks}
          >
            Remove From Favourite
        </button>
      )}
    </div>
  );
};

export default Bookcard;