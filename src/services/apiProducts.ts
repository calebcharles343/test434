import axios from "axios";
import { OrderType, ProductType } from "../interfaces.ts";
import Cookies from "js-cookie";
import { sessionStorageUser } from "../utils/sessionStorageUser.ts";

const url = "https://tia-backend-final.onrender.com/api/v1/e-commerce";

const axiosInstance = axios.create({
  baseURL: url,
});

const getToken = () => {
  const sessionStorageUserX = sessionStorageUser();
  return sessionStorageUserX
    ? Cookies.get(`token-${sessionStorageUserX.id}`) ||
        sessionStorage.getItem(`token-${sessionStorageUserX.id}`)
    : null;
};

// Add request interceptor to attach token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached to request:", token); // Debugging token attachment
    } else {
      console.error("No token found, request not authorized");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Retry logic for rate-limiting errors (429)
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

// Add response interceptor to handle retries
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      return retryRequest(error);
    }
    return Promise.reject(error);
  }
);
export const createProduct = async (productData: Partial<OrderType>) => {
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
