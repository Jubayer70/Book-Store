import { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../components/Loaders/Loader';
import Bookcard from '../components/Bookcard/Bookcard';
const AllBooks = () => {
  const [Data, setData] = useState();
    useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-books"
      );
      console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-[#0A1828] px-12 py-8 h-auto ">
      <h4 className="text-3xl text-[#FFD700]">All Books</h4>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />{" "}
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {Data && Data.map((items) => (
          <div key={items.id}>
            <Bookcard data={items} />{" "}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBooks;