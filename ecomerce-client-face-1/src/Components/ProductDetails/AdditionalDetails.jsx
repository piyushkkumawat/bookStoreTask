import React from "react";

const AdditionalDetails = () => {
  return (
    <section className="px-4 py-2">
      <h2 className="text-gray-600 text-lg font-semibold">
        Additional Details
      </h2>
      <div className="mt-2">
        <div className="border-b border-gray-300 py-2">
          <button
            type="button"
            className="flex justify-between items-center w-full focus:outline-none"
          >
            <span className="text-gray-800 text-lg">Features</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 transform transition-transform duration-300"
            >
              <path
                fillRule="evenodd"
                d="M12 4.5v15m7.5-7.5h-15"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="border-b border-gray-300 py-2">
          <button
            type="button"
            className="flex justify-between items-center w-full focus:outline-none"
          >
            <span className="text-gray-800 text-lg">Care</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 transform transition-transform duration-300"
            >
              <path
                fillRule="evenodd"
                d="M12 4.5v15m7.5-7.5h-15"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="border-b border-gray-300 py-2">
          <button
            type="button"
            className="flex justify-between items-center w-full focus:outline-none"
          >
            <span className="text-gray-800 text-lg">Shipping</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 transform transition-transform duration-300"
            >
              <path
                fillRule="evenodd"
                d="M12 4.5v15m7.5-7.5h-15"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="border-b border-gray-300 py-2">
          <button
            type="button"
            className="flex justify-between items-center w-full focus:outline-none"
          >
            <span className="text-gray-800 text-lg">Returns</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 transform transition-transform duration-300"
            >
              <path
                fillRule="evenodd"
                d="M12 4.5v15m7.5-7.5h-15"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdditionalDetails;
