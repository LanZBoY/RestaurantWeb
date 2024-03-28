import {
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USER,
  BACKEND_SERVICE_RATE,
  BACKEND_SERVICE_RATE_HISTORY,
} from "./EnvVar.js";
import { USER_TOKEN } from "./model/UserModel.js";

export const rateRestaurant = async (rId, rating) => {
  const result = await fetch(
    `${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USER}/${BACKEND_SERVICE_RATE}/${rId}/${rating}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(USER_TOKEN)}`,
        "Content-Type": "application/json",
      },
    }
  );
  return result;
};

export const getRateInfo = async (rId) => {
  const result = await fetch(
    `${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USER}/${BACKEND_SERVICE_RATE_HISTORY}/${rId}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(USER_TOKEN)}`,
        "Content-Type": "application/json",
      },
    }
  );
  return result;
};

export const UnloginMessage = {
  title: "你尚未登入",
  message: "請先登入",
  duration: 5000,
};
