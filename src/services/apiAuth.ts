import axios from "axios";

import {
  PasswordForgotTypes,
  PasswordResetTypes,
  UpdateUserType,
  UserProfileToken,
} from "../interfaces.ts";
// import Cookies from "js-cookie";
import { generalApiHeader } from "../utils/generalApiHeader.ts";

// const apiURL = "https://shopping-list-f1b6.onrender.com/api/v1/shopping-list";
// const authToken = Cookies.get("jwt");

const apiURL = "https://tia-backend-final.onrender.com/api/v1/e-commerce";
// const headers = { authorization: `Bearer ${authToken}` };
const headers = generalApiHeader();

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
    const response = await axios.get<UserProfileToken>(`${apiURL}/users/user`, {
      headers,
    });

    return response.data.data;
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

export const forgotPassword = async function (data: PasswordForgotTypes) {
  try {
    const response = await axios.post<PasswordResetTypes>(
      `${apiURL}/users/forgotPassword`,
      data
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
export const resetPassword = async function (
  token: string,
  data: PasswordResetTypes
) {
  try {
    const response = await axios.patch<PasswordResetTypes>(
      `${apiURL}/users/resetPassword/${token}`,
      data
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
