import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-orange-500" size={50} />
    </div>
  );
};

export default LoadingSpinner;
