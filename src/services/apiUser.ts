import axios from "axios";
import Cookies from "js-cookie";
import { sessionStorageUser } from "../utils/sessionStorageUser.ts";
import { baseUrl } from "./baseUrl.ts";
import { UpdateUserType, UserProfileToken, UsersType } from "../interfaces.ts";

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

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Token attached to request:", token);
    } else {
      console.error("No token found, request not authorized");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const retryRequest = async (error: any, retries: number = 0): Promise<any> => {
  if (retries >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  const delay = RETRY_DELAY * Math.pow(2, retries);
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

// Error Handler
const handleError = (err: any) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data;
  } else {
    console.log(err);
  }
};

// API Functions
export const getActiveUsers = async function () {
  try {
    const response = await axiosInstance.get<UsersType>(`/users`);
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getClosedAccounts = async function () {
  try {
    const response = await axiosInstance.get<UserProfileToken>(
      `/users/closedAccounts`
    );
    return response.data.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getUser = async function () {
  try {
    const response = await axiosInstance.get<UserProfileToken>(`/users/user`);
    return response.data.data;
  } catch (err) {
    return handleError(err);
  }
};

export const updateUser = async function (data: UpdateUserType) {
  try {
    const response = await axiosInstance.patch<UpdateUserType>(
      `/users/updateMe`,
      data
    );
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

export const updatePassword = async function (data: any) {
  try {
    const response = await axiosInstance.patch<UpdateUserType>(
      `/users/updatePassword`,
      data
    );
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

export const closeAccount = async function () {
  try {
    const response = await axiosInstance.delete(`/users/deleteMe`);
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};
