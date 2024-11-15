import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import { ProductCard } from './ProductCard/ProductCard';
import LoadingSpinner from './LoadingSpinner';

const ProductList: React.FC = () => {
  const { visibleProducts, loading, error, loadMoreProducts } = useProductContext();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();


  // Lazy load için IntersectionObserver kullanımı
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreProducts(); // Yeni ürünleri yükle
        }
      },
      { rootMargin: '100px' }
    );


    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMoreProducts]);

  // Yükleniyor ve ürün yoksa göster
  if (loading && visibleProducts.length === 0) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full  sm:mt-4">
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
        {visibleProducts.length > 0 ? (
          // Ürünleri listele
          visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              shippingInformation={product.shippingInformation}
              imageUrl={product.images[0]}
              onClick={() => navigate(`/product/${product.id}`)} // Ürün sayfasına yönlendir
            />
          ))
        ) : (
          <p>Ürün Bulunamadı.</p> // Ürün bulunamadığında mesaj
        )}
      </div>
      {loading && <p>Daha Fazla Ürün Yükleniyor...</p>}
      <div ref={loaderRef} className="text-center mt-4">
        {visibleProducts.length > 0 && !loading && <p></p>}
      </div>
    </div>
  );
};

export default ProductList;
