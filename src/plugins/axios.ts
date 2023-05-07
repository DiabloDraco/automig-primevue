import { getFromLocal, removeFromLocal } from "@/utils";
import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use((config) => {
  const token = getFromLocal("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token.base64Decode()}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 401:
        removeFromLocal("token");
        removeFromLocal("user");
        delete error.config.headers["Authorization"];
        const a = document.createElement("a");
        a.href = "/login";
        a.click();
        return;
    }
    return Promise.reject(error);
  }
);

if (location.pathname != "/login") {
  axios.post("v1/users/me");
}

export default axios;
