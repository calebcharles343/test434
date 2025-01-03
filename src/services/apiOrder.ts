import axios from "axios";
import Cookies from "js-cookie";
import { OrderType } from "../interfaces.ts";

const url = "https://tia-backend-final.onrender.com/api/v1/e-commerce";

const axiosInstance = axios.create({
  baseURL: url,
});

// Add request interceptor to attach token dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

// API Functions
export const createOrder = async (orderData: OrderType) => {
  const response = await axiosInstance.post(`/orders/create`, orderData);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

export const getAllAdminOrders = async () => {
  const response = await axiosInstance.get("/orders/admin");
  return response.data;
};

export const getOrder = async (id: number) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (
  id: number,
  orderData: Partial<OrderType>
) => {
  const response = await axiosInstance.patch(`/orders/update/${id}`, orderData);
  return response.data;
};

export const cancelOrder = async (
  id: number,
  orderData: Partial<OrderType>
) => {
  const response = await axiosInstance.patch(`/orders/cancel/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id: number) => {
  const response = await axiosInstance.delete(`/orders/delete/${id}`);
  return response.data;
};
