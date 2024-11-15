import React from 'react';
import { Button } from '../ui/button';

interface ProductButtonProps {
  label: string;
}

export const ProductButton: React.FC<ProductButtonProps> = ({ label }) => (
  <div className="pt-1">
    <Button 
      className="block h-8 px-2 text-center bg-orange-500 text-white text-xs rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-orange-300 transition-opacity duration-300"
    >
      <span className='text-md'>{label}</span>
    </Button>
  </div>
);
