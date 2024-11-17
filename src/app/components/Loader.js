// components/Loader.tsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-2 h-full z-50">
      <div className="animate-spin rounded-full border-t-4 border-green-500 w-12 h-12"></div>
      <p className='text-black opacity-45'>Loading...</p>
    </div>
  );
};

export default Loader;
