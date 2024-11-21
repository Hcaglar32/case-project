import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('https://hcaglar32.github.io/case-laravel/public/data.json');
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
