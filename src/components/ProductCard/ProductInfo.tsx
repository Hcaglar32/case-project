import React from 'react';
import { ProductButton } from './ProductButton';

interface ProductInfoProps {
  name: string;
  shippingInfo: string;
  price: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ name, shippingInfo, price }) => (
  <div className="px-2 lg:text-start text-center " role="contentinfo" aria-labelledby="product-info">
    <p className="text-orange-500 font-semibold " id="product-info">
      <span className="text-gray-700">{name}</span>
    </p>
    <p className="text-gray-400 font-semibold mt-1 text-sm" aria-label={`Shipping information: ${shippingInfo}`}>
      {shippingInfo}
    </p>
    <div className="flex justify-center items-center gap-3 my-2">
      <p className="text-lg text-end font-bold text-orange-600 mt-1" aria-label={`Price: ${price}`}>
        {price} ₺
      </p>
      <div className="lg:ml-auto">
        <ProductButton label="Sepete ekle" />
      </div>
    </div>
  </div>
);
