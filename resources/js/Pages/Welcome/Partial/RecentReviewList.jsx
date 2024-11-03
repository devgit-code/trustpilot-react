import React from 'react';

const CenteredDiv = () => {
  return (
    <div className="relative h-96 bg-gray-100">
      {/* Child div centered based on its own height */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg">
        Centered based on its own height
      </div>
    </div>
  );
};

export default CenteredDiv;
