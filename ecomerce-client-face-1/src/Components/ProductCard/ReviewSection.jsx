import React from "react";

const ReviewSection = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center mt-1">
      <div className="flex text-sm">
        <svg
          className="h-5 w-5 fill-current text-yellow-500 mr-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700">
          {rating.toFixed(1)} out of 5 stars
        </span>
      </div>
      <span className="text-gray-600 ml-2">{reviewCount} reviews</span>
    </div>
  );
};

export default ReviewSection;
