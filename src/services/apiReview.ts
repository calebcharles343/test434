import axios from "axios";

import { ReviewType } from "../interfaces";
import { generalApiHeader } from "../utils/generalApiHeader";

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
