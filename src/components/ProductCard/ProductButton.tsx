import React from 'react';
import { Button } from '../ui/button';

interface ProductButtonProps {
  label: string;
}

export const ProductButton: React.FC<ProductButtonProps> = ({ label }) => (
  <div className="px-2 pt-2">
    <Button size={"sm"}
      className="block bg-orange-500 text-white text-xs  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      {label}
    </Button>  </div>
);
