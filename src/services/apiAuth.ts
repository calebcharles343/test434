import axios from "axios";

import { UpdateUserType, UserProfileToken } from "../interfaces.ts";
import Cookies from "js-cookie";

// const apiURL = "https://shopping-list-f1b6.onrender.com/api/v1/shopping-list";
const authToken = Cookies.get("jwt");

const apiURL = "https://tia-backend-final.onrender.com/api/v1/e-commerce";
const headers = { authorization: `Bearer ${authToken}` };

export const login = async function (email: string, password: string) {
  try {
    const response = await axios.post<UserProfileToken>(
      `${apiURL}/users/login`,
      {
        email,
        password,
      }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const signup = async function (
  name: string,
  email: string,
  password: string,
  confirm_password: string
) {
  try {
    const response = await axios.post<UserProfileToken>(
      `${apiURL}/users/signup`,
      { name, email, password, confirm_password }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const getUser = async function () {
  try {
    const response = await axios.get<UpdateUserType>(`${apiURL}/users/user`, {
      headers,
    });
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const updateUser = async function (
  UserId: number | undefined,
  data: UpdateUserType
) {
  console.log("❌updateUser", data);

  try {
    const response = await axios.patch<UpdateUserType>(
      `${apiURL}/users/${UserId}`,
      data,
      { headers }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const logout = async function () {
  try {
    const response = await axios.post(`${apiURL}/users/logout`);
    // console.log(response.data);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
