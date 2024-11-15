import React from 'react';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductButton } from './ProductButton';


// Ürün kartında yer alan bilgiler
interface ProductCardProps {
  title: string;
  price: string;
  shippingInformation: string;
  imageUrl: string;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  shippingInformation,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      onClick={onClick} // Ürün kartına tıklanınca onClick işlevini çağır
      className="relative group rounded-lg overflow-hidden w-full p-3 cursor-pointer"
    >
      <ProductImage imageUrl={imageUrl} name={title} />
      <ProductInfo
        name={title} // Ürün adı
        shippingInfo={shippingInformation}
        price={price}
      />
    </div>
  );
};
