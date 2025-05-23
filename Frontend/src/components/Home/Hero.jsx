import React from 'react'
import heroimg from "../../assets/bookstore1.jpg"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center"
      style={{ backgroundColor: '#0A1828' }}
    >
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-start justify-center px-4 md:px-8">
        <h1 className="text-4xl lg:text-6xl md:text-5xl font-semibold text-[#FFD700] text-left">
          Where Every Page Begins an Adventure
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#FFD700]">
          "Curated stories, timeless journeys."
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-red-500 text-2xl font-semibold border border-black px-10 py-3 hover:bg-green-200 rounded-full bg-white"
          >
            Discover Books
          </Link>
        </div>
      </div>
      <div className="mt-20 w-full lg:w-3/6 flex items-center justify-center px-4 md:px-8">
        <img
          src={heroimg}
          alt="hero"
          className="object-contain w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;