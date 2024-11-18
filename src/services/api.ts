import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/hcaglar32/case-laravel/main/storage/app/data.json');
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
