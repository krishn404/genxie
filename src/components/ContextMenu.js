import React from "react";

const ContextMenu = () => {
  return (
    <div className="w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Copy</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Cut</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Delete</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Duplicate</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Format option</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
