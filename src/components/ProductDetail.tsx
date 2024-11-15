import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import { Home } from 'lucide-react';
import { Button } from './ui/button';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Helmet } from 'react-helmet';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { visibleProducts } = useProductContext();
  const product = visibleProducts.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa kaydırmasını sıfırlama
    document.body.classList.add('animate-fadeIn'); // Fade-in animasyonu
    return () => {
      document.body.classList.remove('animate-fadeIn'); // Sayfa kapanırken animasyonu kaldırma
    };
  }, []);

  if (!product) {
    return <p className="text-center text-gray-500" role="alert">Ürün Bulunamadı</p>;
  }

  const handleSmallImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Helmet kullanarak dinamik meta yapısı kullanıyoruz. */}
      <Helmet>
        <title>{product.title} - {product.category} | Bulut Sistem Online Mağaza</title>
        <meta name="description" content={`${product.title} - ${product.category}. ${product.description.slice(0, 160)}... Satın almak için hemen tıklayın.`} />
        <meta property="og:title" content={`${product.title} - ${product.category} | Bulut Sistem Online Mağaza`} />
        <meta property="og:description" content={`${product.description.slice(0, 160)}...`} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:price:amount" content={product.price} />
      </Helmet>

      <div className="max-w-screen-lg my-10 mx-auto p-4">
        <nav className="flex items-center space-x-4 text-sm text-gray-600">
          <Button variant={"ghost"} onClick={() => navigate('/')} className="hover:text-orange-500 transition-colors" aria-label="Ana sayfaya dön">
            Ana Sayfa
          </Button>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-800">{product.category}</span>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-800">{product.title}</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">{product.title}</h1>
          <Button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
            aria-label="Ana sayfaya dön"
          >
            <Home size={20} className="text-black" />
            <span className="text-black">Ana Sayfaya Dön</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-6 space-y-6 md:space-y-0 md:space-x-6">
          {/* Ana Resim */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={product.images[currentIndex]}
              alt={`Detaylı ${product.title} Ürünü Resmi`}
              className="w-full md:w-96 h-72 object-contain cursor-pointer rounded-lg border"
              onClick={() => setOpen(true)}
              role="button"
              aria-label={`Ürünün detaylı resmi, ${product.title}`}
            />
          </div>

          {/* Ürün Bilgisi */}
          <div className="w-full md:w-1/2">
            <p className="text-3xl font-bold text-orange-500 mb-2">{product.price}</p>
            <p className="text-sm text-gray-500">{product.shippingInformation}</p>
            <p className="text-gray-700 font-medium mt-2">
              Stok: {product.stock > 0 ? `${product.stock} ürün` : 'Stokta yok'}
            </p>
            <p className="text-gray-600 mt-2">
              Kategori: <span className="font-medium">{product.category}</span>
            </p>
            <p className="text-gray-600 mt-2">
              Puan: <span className="font-medium">{product.rating}</span> / 5
            </p>
            <p className="text-lg font-semibold mt-6">Ürün Açıklaması</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-500 mt-2">Garanti: {product.warrantyInformation}</p>
            <p className="text-gray-500">İade Politikası: {product.returnPolicy}</p>
          </div>
        </div>

        {/* Ufak Resimler */}
        <div className="w-full overflow-x-auto flex space-x-4 py-4 mb-6" aria-live="polite">
          {product.images.map((image, index) => (
            <div key={index} className="w-20 h-20 md:w-24 md:h-24">
              <img
                src={image}
                alt={`Ürün küçük resmi ${index + 1}`}
                className={`w-full h-full object-contain cursor-pointer rounded-lg ${currentIndex === index ? 'border-2 border-orange-500' : ''}`}
                onClick={() => handleSmallImageClick(index)} // Set current index on click
                role="button"
                aria-label={`Ürün küçük resmi ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={product.images.map((image) => ({ src: image }))}
          index={currentIndex}
          aria-labelledby="product-image-gallery"
        />

        {/* Müşteri Yorumları */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Müşteri Yorumları</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md" aria-live="polite">
                <p className="text-gray-800 font-medium">{review.reviewerName}</p>
                <p className="text-gray-600 text-sm">{review.date}</p>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                <p className="mt-1 text-sm text-gray-500">Puan: {review.rating}/5</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
