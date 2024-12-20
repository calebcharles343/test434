export function localStorageUser() {
  const storedUserJSON = localStorage.getItem("localUser");

  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
      console.log(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }
  return storedUser;
}
