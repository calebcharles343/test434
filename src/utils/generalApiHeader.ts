import { getUserToken, sessionStorageUser } from "./sessionStorageUser";

const currentUser = sessionStorageUser();
const authToken = currentUser ? getUserToken(currentUser.id) : null;

export function generalApiHeader() {
  const header = authToken ? { authorization: `Bearer ${authToken}` } : {};
  return header;
}
