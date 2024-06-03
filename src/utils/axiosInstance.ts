/* This code snippet is setting up an Axios instance with global request and response interceptors for
handling authentication token refresh. Here's a breakdown of what the code is doing: */

import { UserInfo } from "@src/types";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add global request interceptor
axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo: UserInfo | null = userInfoString
      ? JSON.parse(userInfoString)
      : null;

    if (userInfo && userInfo.tokens.access) {
      request.headers[
        "Authorization"
      ] = `Bearer ${userInfo.tokens.access.token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add global response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

      try {
        const userInfoString = localStorage.getItem("userInfo");
        const userInfo: UserInfo | null = userInfoString
          ? JSON.parse(userInfoString)
          : null;

        // Make a request to your auth server to refresh the token.
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-tokens`,
          {
            refreshToken: userInfo?.tokens.refresh.token,
          }
        );

        // Store the new access and refresh tokens.
        localStorage.setItem("userInfo", JSON.stringify(response.data));

        // Update the authorization header with the new access token.
        const newUserInfo = response.data as UserInfo;
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newUserInfo.tokens.access.token}`;

        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("userInfo");
        window.location.href = "/auth/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default axiosInstance;
