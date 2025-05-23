import { useEffect, useState } from 'react';
import axios from "axios";
import Bookcard from '../Bookcard/Bookcard';
import Loader from '../Loaders/Loader';

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books"
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (err) {
        setError('Failed to fetch recently added books.');
        console.error(err);
      }
    };
    fetch();
  }, []);
  
  return (
    <div className="mt-8 px-4" style={{ backgroundColor: '#0A1828' }}>
      <h4 className="text-3xl text-[#FFD700]">Recently Added Books</h4>
      {error && (
        <div className="flex items-center justify-center my-8 text-red-600">
          {error}
        </div>
      )}
      {!Data && !error && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data && Data.map((items, i) => (
          <div key={i}>
            <Bookcard data={items} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAdded;
