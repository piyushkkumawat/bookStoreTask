import React from "react";
const ProductImagePanel = ({ productImages }) => {
  return (
    // <div
    //   id="headlessui-tabs-panel-9"
    //   role="tabpanel"
    //   tabIndex={0}
    //   data-headlessui-state="selected"
    //   aria-labelledby="headlessui-tabs-tab-undefined"
    //   className=" p-4" // Tailwind CSS border and padding classes
    // >
    <img
      src={productImages && productImages[0]}
      loading="lazy"
      alt="Angled front view with bag zipped and handles upright."
      className="h-full rounded-lg shadow-md m-auto" 
    />
    // </div>
  );
};

export default ProductImagePanel;
