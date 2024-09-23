// HoverCard.js
import React from 'react';

const HoverCard = ({ place, onClose }) => {
  return (
    <div className="absolute z-10 bg-white p-4 rounded shadow-lg" style={{ width: '200px' }}>
      <h3 className="font-bold text-lg mb-2">{place.name}</h3>
      <p className="text-sm mb-4">{place.description}</p>
      <div className="flex flex-col">
        <button
          className="bg-blue-500 text-white py-1 px-2 rounded mb-2 hover:bg-blue-700"
          onClick={() => window.open(`/places/${place._id}`, '_blank')}
        >
          Read More
        </button>
        {place.isMarked && (
          <button
            className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700"
            onClick={() => window.open(`/blogs/${place._id}`, '_blank')}
          >
            View Blogs
          </button>
        )}
      </div>
      <button className="absolute top-1 right-1 text-gray-500" onClick={onClose}>×</button>
    </div>
  );
};

export default HoverCard;
