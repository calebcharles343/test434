import axios from "axios";
import { ProductType } from "../interfaces.ts";
import { generalApiHeader } from "../utils/generalApiHeader.ts";

const headers = generalApiHeader();
const url = "https://tia-backend-final.onrender.com/api/v1/e-commerce";

console.log(headers);

const axiosInstance = axios.create({
  baseURL: url,
  headers,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Initial delay in milliseconds

const retryRequest = async (error: any, retries: number = 0): Promise<any> => {
  if (retries >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  const delay = RETRY_DELAY * Math.pow(2, retries); // Exponential backoff
  await new Promise((resolve) => setTimeout(resolve, delay));

  return axiosInstance
    .request(error.config)
    .catch((err) => retryRequest(err, retries + 1));
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      return retryRequest(error);
    }
    return Promise.reject(error);
  }
);

export const createProduct = async (productData: Partial<ProductType>) => {
  const response = await axiosInstance.post(`/products/create`, productData);
  return response.data;
};
export const getAllProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const getProduct = async (id: number) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (
  id: number,
  productData: Partial<ProductType>
) => {
  const response = await axiosInstance.patch(
    `/products/update/${id}`,
    productData
  );
  return response.data;
};
export const deleteProduct = async (id: number) => {
  const response = await axiosInstance.delete(`/products/delete/${id}`);
  return response.data;
};
