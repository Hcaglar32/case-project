import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./contexts/ProductContext";
import LoadingSpinner from "./components/LoadingSpinner";
import MaxWidthWrapper from "./components/maxWidthWrapper";

const ProductList = React.lazy(() => import("./components/ProductList"));
const ProductDetail = React.lazy(() => import("./components/ProductDetail"));

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa değişiminde yukarı kaydırır
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Router basename="/case-project">
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <MaxWidthWrapper>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <ProductList />
                  </>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </MaxWidthWrapper>
        </Suspense>
      </Router>
    </ProductProvider>
  );
};

export default App;
