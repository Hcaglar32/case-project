import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProductProvider } from './contexts/ProductContext';
import LoadingSpinner from './components/LoadingSpinner';

// Dinamik yükleme için React.lazy kullanımı
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  // Sayfa her değiştiğinde scroll'u sıfırlıyoruz
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null; // Bu bileşen sadece scroll sıfırlama işlemi yapacak, görsel bir bileşen render etmesine gerek yok
};


const App: React.FC = () => {
  return (
    <ProductProvider>
      <Router>
        <ScrollToTop /> {/* Scroll sıfırlama bileşenini Router'ın içinde kullanıyoruz */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Navbar sadece ürün listeleme sayfasında görünsün */}
            <Route
              path="/"
              element={
                <>
                  <Navbar /> {/* Navbar burada */}
                  <ProductList /> {/* Ürün listeleme sayfası */}
                </>
              }
            />

            {/* Ürün detay sayfası */}
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </ProductProvider>
  );
};

export default App;
