import React from 'react';

interface ProductImageProps {
  imageUrl: string; 
  name: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, name }) => (
  <div className="w-full h-36 rounded-lg overflow-hidden mb-3">
    <img
      src={imageUrl} 
      alt={name}
      loading="lazy" 
      className="w-full h-full object-contain"
    />
  </div>
);
