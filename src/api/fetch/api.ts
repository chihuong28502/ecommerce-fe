'use client'
// import { AuthRequest } from "@/modules/auth/request";
import axios, { AxiosInstance } from "axios";

export const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

const registerInterceptorResponse = (clientInstance: AxiosInstance) => {
  clientInstance.interceptors.response.use(
    (response: any) => {
      return response?.data || response;
    },
    async function (error) {
      const originalRequest = error?.config;
      if (error?.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            if (!originalRequest?._retry) {
              console.log("🚀 ~ originalRequest?._retry:", originalRequest?._retry)
              originalRequest._retry = true;
              try {
                // const response: any = await AuthRequest.refreshToken();
                // const { success } = response;
                // if (success) {
                //   dispatch(AuthActions.getInfoUser({}));
                //   return AxiosClient(originalRequest);
                // } else {
                //   store.dispatch(AuthActions.logout({}));
                //   return Promise.reject(new Error("Token expired, please login again"));
                // }
              } catch (err) {
                // message.error("Hết phiên làm việc, hãy thực hiện đăng nhập.");
              }
            }
            return Promise.reject(error);

          case 403:
            return Promise.reject(error);
          case 404:
            return Promise.reject(error);

          case 500:
            return Promise.reject(error);

          default:
            return Promise.reject(error);
        }
      } else {
        // Xử lý khi không có phản hồi từ server (ví dụ: mất kết nối)
        // message.error("Network Error");
      }

      return Promise.reject(error);
    }
  );
};

registerInterceptorResponse(AxiosClient);

// Các phương thức gọi API
const post = (url: string, data?: any, config = {}) => {
  return AxiosClient.post(url, data, config);
};

const get = (url: string, config = {}) => {
  return AxiosClient.get(url, config);
};

const put = (url: string, data?: any, config = {}) => {
  return AxiosClient.put(url, data, config);
};

const patch = (url: string, data?: any, config = {}) => {
  return AxiosClient.patch(url, data, config);
};

const del = (url: string, config = {}) => {
  return AxiosClient.delete(url, config);
};

const APPLEFetch = {
  post,
  get,
  put,
  patch,
  delete: del,
};

export default APPLEFetch;
