import React from 'react';

interface ProductInfoProps {
  name: string;
  shippingInfo: string;
  price: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ name, shippingInfo, price }) => (
  <div className="px-2" role="contentinfo" aria-labelledby="product-info">
    <p className="text-orange-500 font-semibold " id="product-info">
      <span className="text-gray-700">{name}</span>
    </p>
    <p className="text-gray-400 font-semibold mt-1 text-sm" aria-label={`Shipping information: ${shippingInfo}`}>
      {shippingInfo}
    </p>
    <p className="text-lg font-bold text-orange-600 mt-1" aria-label={`Price: ${price}`}>
      {price}
    </p>
  </div>
);
