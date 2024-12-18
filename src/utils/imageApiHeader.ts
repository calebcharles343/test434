import Cookies from "js-cookie";

const authToken = Cookies.get("jwt");

export const imageHeader = function (id: string) {
  const imageKey = id.includes("userAvatar") ? "x-user-id" : "x-product-id";

  const headers = {
    [imageKey]: id,
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${authToken}`,
  };

  return headers;
};
