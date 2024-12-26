import Cookies from "js-cookie";

const authToken = Cookies.get("jwt");

export function generalApiHeader() {
  const header = { authorization: `Bearer ${authToken}` };
  return header;
}
