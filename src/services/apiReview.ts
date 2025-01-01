import axios from "axios";

import { ReviewType } from "../interfaces";
import { sessionStorageUser } from "../utils/sessionStorageUser";
import Cookies from "js-cookie";
import { baseUrl } from "./baseUrl";

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
