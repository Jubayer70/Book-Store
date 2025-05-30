import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';

const UpdateBooks = () => {
  const [Data, setData] = useState(
    {
      url: "",
      title: "",
      author:"",
      price:'',
      desc: "",
      language:""
    }
  );

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author:"",
          price: "",
          desc: "",
          language:""
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`)
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }
    useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  return (
    <div className="bg-[#0A1828] h-[100%] p-0 md:p-4">
      <h1 className="text-3xl text-white md:text-5xl fonr-semibold text-gold mb-8">
        Update Book Details
      </h1>
      <div className="p-4 bg-[#0A1828] rounded">
        <div>
          <label htmlFor="" className="text-zinc-400"> 
            Image
          </label>
          <input
            type='text'
            className='w-full mt-2 white text-black p-2 outline-none'
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-white">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            placeholder="title of book"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-white">
            Name of Authors
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            placeholder="title of author"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Price
          </label>
          <input
            type="number"
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            placeholder="price of Book"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description 
          </label>
          <textarea
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            rows="5"
            placeholder="Description of Services"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Language
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            placeholder="language of Book"
            name="language"
            required
            value={Data.language}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          onClick={submit}
        >
        Update Details
        </button>
      </div>
    </div>
  )
}

export default UpdateBooks;

