import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('http://bulutsistemcase.test/api/products');
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
