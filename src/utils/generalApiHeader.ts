// import Cookies from "js-cookie";
import { localStorageUser } from "./localStorageUser";

// const authToken = Cookies.get("jwt");
const localStorageUserX = localStorageUser();

const authToken = localStorage.getItem(`token${localStorageUserX.id}`);
export function generalApiHeader() {
  const header = { authorization: "Bearer " + authToken };
  return header;
}

// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";

// export function generalApiHeader() {
//   const authToken =
//     useSelector((state: RootState) => state.auth.token);

//   const header = { authorization: `Bearer ${authToken}` };
//   return header;
// }
