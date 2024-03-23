export const BACKEND_SEVICE_ROOT = process.env.BACKEND_SERVICE_ROOT;
export const BACKEND_SERVICE_USERS = process.env.BACKEND_SERVICE_USERS;
export const BACKEND_SERVICE_RESTAURANTS =
  process.env.BACKEND_SERVICE_RESTAURANTS;
export const BACKEND_SERVICE_IMAGES = process.env.BACKEND_SERVICE_IMAGES;

// localStorageKey
export const USER_TOKEN = "userToken";

export default function setCookie(key, value, expireTime) {
  if (key === undefined || value === undefined) return;
  document.cookie = `${key}=${value};`;
}
