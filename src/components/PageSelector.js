import React from 'react';

const PageSelector = ({ pages, setPages }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Number of Pages:</label>
      <input
        type="number"
        min="1"
        value={pages}
        onChange={(e) => setPages(Number(e.target.value))}
        className="mt-1 p-2 border rounded-lg w-full"
      />
    </div>
  );
};

export default PageSelector;

