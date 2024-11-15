# Bulut Sistem React Case

Bu proje, **React**, **TypeScript** ve **Vite** kullanılarak geliştirilmiş bir frontend uygulamasıdır. **Laravel API**'si ile bağlanarak dinamik olarak veri çekilir ve kullanıcıya ürün bilgileri gösterilir. Uygulama, hızlı geliştirme için HMR (Hot Module Replacement) desteği, ESLint yapılandırmaları ve modern kütüphanelerle oluşturulmuştur.

This project is a frontend application developed using **React**, **TypeScript**, and **Vite**. It connects to a **Laravel API** to dynamically fetch and display product information. The application is built with HMR (Hot Module Replacement) support for fast development, ESLint configurations, and modern libraries.

## Özellikler / Features

- **React** ile kullanıcı arayüzü / User interface with **React**
- **TypeScript** ile tür güvenliği / Type safety with **TypeScript**
- **Vite** ile hızlı geliştirme süreçleri ve HMR desteği / Fast development and HMR support with **Vite**
- **Lucide React** ikon kütüphanesi / **Lucide React** icon library
- **Tailwind CSS** ile şık ve modern tasarım / Stylish and modern design with **Tailwind CSS**
- **Shadcn-ui** ile UI bileşenleri / UI components with **Shadcn-ui**
- **Axios**, **Context**, **React Router**, **Lightbox**, **Debounce** gibi npm paketleri kullanıldı / **Axios**, **Context**, **React Router**, **Lightbox**, **Debounce** npm packages used
- **Laravel API** ile ürün verisi entegrasyonu / Product data integration with **Laravel API**

## Başlarken / Getting Started

Projeyi başlatmak için aşağıdaki adımları takip edebilirsiniz:  
Follow the steps below to get started:

1. Depoyu klonlayın ve proje dizinine girin:  
   Clone the repository and navigate to the project directory:
    ```bash
    git clone https://github.com/kendi-username/bulut-sistem-react-case.git
    cd bulut-sistem-react-case
    ```

2. Gerekli bağımlılıkları yükleyin:  
   Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Geliştirme sunucusunu başlatın:  
   Start the development server:
    ```bash
    npm run dev
    ```

4. Projeyi tarayıcıda açın:  
   Open the project in your browser:  
   Visit the following URL in your browser:
    ```bash
    http://localhost:3000
    ```

## API Entegrasyonu / API Integration

Bu proje, **Laravel API**'sinden ürün verilerini çekmektedir. API, şu endpoint üzerinden erişilebilir:  
This project fetches product data from a **Laravel API**. The API can be accessed through the following endpoint:

```bash
http://localhost:8000/api/products

Örnek / Example

import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products');
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
