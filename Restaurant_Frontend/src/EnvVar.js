export const BACKEND_SEVICE_ROOT = process.env.BACKEND_SERVICE_ROOT;
export const BACKEND_SERVICE_USER = process.env.BACKEND_SERVICE_USER;
export const BACKEND_SERVICE_RESTAURANTS =
  process.env.BACKEND_SERVICE_RESTAURANTS;
export const BACKEND_SERVICE_IMAGES = process.env.BACKEND_SERVICE_IMAGES;
export const BACKEND_SERVICE_RATE = process.env.BACKEND_SERVICE_RATE;
export const BACKEND_SERVICE_RATE_HISTORY =
  process.env.BACKEND_SERVICE_RATE_HISTORY;

export default function setCookie(key, value, expireTime) {
  if (key === undefined || value === undefined) return;
  document.cookie = `${key}=${value};`;
}
