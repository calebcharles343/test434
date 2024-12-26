import Cookies from "js-cookie";
// import { localStorageUser } from "./localStorageUser";

const authToken = Cookies.get("jwt");
// get user
// const localStorageUserX = localStorageUser();
// const storedToken = localStorage.getItem(`token${localStorageUserX.id}`);
// const authTokenX = storedToken ? JSON.parse(storedToken) : null;
// const authTokenX = JSON.parse(storedToken!);

// console.log(authToken, authTokenX);

export function generalApiHeader() {
  const header = { authorization: `Bearer ${authToken}` };
  return header;
}
