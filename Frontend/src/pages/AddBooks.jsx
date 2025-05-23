import React,{ useState } from 'react'
import axios from 'axios'
const Addbook = () => {
  const [Data, setData] = useState(
    {
      url: "",
      title: "",
      author:"",
      price: "",
      desc: "",
      language:"",
    }
  );
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.author === "" ||
        Data.title === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === "" 
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
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
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4 text-black">
      <h1 className="text-3xl md:text-5xl fonr-semibold mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-[#0A1828] border border-black rounded">
        <div>
          <label htmlFor="" className="text-yellow-500"> 
            Image
          </label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-100 text- p-2 outline-none border border-black'
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-yellow-500">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 text-black p-2 outline-none border border-black"
            placeholder="title of Book"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-yellow-500">
            Author Names
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 text-black p-2 outline-none border border-black"
            placeholder="Name of Author"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-yellow-500">
            Price
          </label>
          <input
            type="number"
            className="w-full mt-2 bg-zinc-100 text-black p-2 outline-none border border-black"
            placeholder="price of book"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-yellow-500">
            Description 
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-100 text-black p-2 outline-none border border-black"
            rows="5"
            placeholder="Description of Services"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-yellow-500">
            Language
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 text-black p-2 outline-none border border-black"
            placeholder="Written language"
            name="language"
            value={Data.language}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-black font-semibold py-2 rounded hover:bg-blue-600 transition"
          onClick={submit}
        >
          Add Books
        </button>
      </div>
    </div>
  )
}

export default Addbook;
