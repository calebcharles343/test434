import Cookies from "js-cookie";

export function localStorageUser() {
  const storedUserJSON = localStorage.getItem("localUser");

  const authToken = Cookies.get("jwt");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    // console.log("No stored user found");
  }

  if (!authToken) {
    // console.log("No auth token found, setting storedUser to null");
    storedUser = null;
  }

  return storedUser;
}
