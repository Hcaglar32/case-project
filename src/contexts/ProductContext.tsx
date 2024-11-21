import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchAllProducts } from '../services/api';

// Ürün tipini tanımlıyoruz
interface Product {
  id: number;
  title: string;
  price: string;
  shippingInformation: string;
  images: string[];
  category: string;
  thumbnail: string;
  rating: number;
  description: string;
  stock: number;
  brand: string;
  warrantyInformation: string;
  returnPolicy: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
  meta: { createdAt: string };
}

// Context API ile sağlanacak değerlerin tipini tanımlıyoruz
interface ProductContextProps {
  visibleProducts: Product[];
  loading: boolean;
  error: string | null;
  loadMoreProducts: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  setSorting: (option: string) => void;
  setFiltering: (selectedCategories: string[]) => void;
  setFilteringByPrice: (min: number | null, max: number | null) => void;
}

// ProductContext ile React context oluşturuluyor
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Kategorilerin api den gelen şekilde gösterilmemesi için formatlayan fonksiyon
const formatCategoryName = (category: string): string => {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Ürünleri yöneten Provider bileşeni
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProductsPage, setVisibleProductsPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sorting, setSorting] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const itemsPerPage = 20;

  useEffect(() => {
    // Ürünleri API'den çekmek için asenkron fonksiyon
    const getProducts = async () => {
      try {
        setLoading(true);
        const cachedProducts = localStorage.getItem('products');
        const cacheTimestamp = localStorage.getItem('cacheTimestamp');
        const cacheDuration = 1000 * 60 * 60; // 1 saat (milisaniye)

        if (cachedProducts && cacheTimestamp && Date.now() - Number(cacheTimestamp) < cacheDuration) {
          // Cache süresi dolmamışsa
          setProducts(JSON.parse(cachedProducts));
          setLoading(false);
        } else {
          // Cache süresi dolmuşsa veya cache yoksa, API'den veri çek
          const allProducts = await fetchAllProducts();
          setProducts(allProducts);
          localStorage.setItem('products', JSON.stringify(allProducts)); // Verileri cache'le
          localStorage.setItem('cacheTimestamp', String(Date.now())); // Zaman damgası ekle
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    getProducts(); // Ürünleri yükle
  }, []);

  useEffect(() => {
    // Filtreleme ve sıralama işlemleri
    let filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Kategori filtresi
    if (selectedCategories.length) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Fiyat filtresi
    if (minPrice !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.price) >= minPrice
      );
    }
    if (maxPrice !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.price) <= maxPrice
      );
    }

    // Sıralama işlemi
    switch (sorting) {
      case 'price':
        filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'newest':
        filteredProducts = filteredProducts.sort(
          (a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
        );
        break;
      case 'popular':
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    // Sayfa başına ürün sayısını ayarla
    setVisibleProducts(filteredProducts.slice(0, visibleProductsPage * itemsPerPage));
  }, [products, searchQuery, visibleProductsPage, sorting, selectedCategories, minPrice, maxPrice]);

  const loadMoreProducts = () => {
    setVisibleProductsPage(prevPage => prevPage + 1);
  };

  //Kategoriye göre filtreleme yaparken api deki ismi ile filtreleme yapması için yazılan fonksiyon
  const setFiltering = (formattedCategories: string[]) => {
    const originalCategories = formattedCategories.map((formattedCategory) => {
      return categoryMap.get(formattedCategory) || formattedCategory;
    });
    setSelectedCategories(originalCategories);
  };

  const setFilteringByPrice = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const categoryMap = new Map(
    products.map((product) => [formatCategoryName(product.category), product.category])
  );

  const uniqueCategories = [...new Set(products.map((product) => product.category))];
  const formattedCategories = uniqueCategories.map(formatCategoryName);

  return (
    <ProductContext.Provider
      value={{
        visibleProducts,
        loading,
        error,
        loadMoreProducts,
        searchQuery,
        setSearchQuery,
        categories: formattedCategories,
        setSorting,
        setFiltering,
        setFilteringByPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// useContext kullanarak ProductContext'e erişim sağlayan hook
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
