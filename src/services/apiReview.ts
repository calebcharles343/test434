import axios from "axios";
import Cookies from "js-cookie";
import { sessionStorageUser } from "../utils/sessionStorageUser.ts";
import { baseUrl } from "./baseUrl.ts";
import { ReviewType } from "../interfaces.ts";

const url = baseUrl();

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

export const getAllReviews = async (productId: number) => {
  const response = await axiosInstance.get(`/reviews/${productId}`);
  return response.data;
};

export const getReview = async (productId: number, reviewId: number) => {
  const response = await axiosInstance.get(`/reviews/${productId}/${reviewId}`);
  return response.data;
};

export const createReview = async (
  productId: number,
  reviewData: ReviewType
) => {
  const response = await axiosInstance.post(
    `/reviews/create/${productId}`,
    reviewData
  );
  return response.data;
};
export const updateReview = async (
  productId: number,
  reviewId: number,
  reviewData: ReviewType
) => {
  const response = await axiosInstance.patch(
    `/reviews/update/${productId}/${reviewId}`,
    reviewData
  );
  return response.data;
};

export const deleteReview = async (productId: number, reviewId: number) => {
  const response = await axiosInstance.delete(
    `/reviews/delete/${productId}/${reviewId}`
  );
  return response.data;
};
