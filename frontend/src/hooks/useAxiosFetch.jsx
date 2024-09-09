import { useEffect, useMemo } from "react";
import axios from "axios";

// This hook creates a customized axios instance with interceptors
const useAxiosFetch = (baseURL = "http://localhost:3000/") => {
  // Create a memoized axios instance to avoid unnecessary re-creations
  const axiosInstance = useMemo(() => axios.create({ baseURL }), [baseURL]);

  useEffect(() => {
    // Set up request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // You could add auth headers or other request modifications here
        // For example: config.headers.Authorization = `Bearer ${yourAuthToken}`;
        return config;
      },
      (error) => {
        // Handle any request errors
        console.error("Oops! Request error:", error);
        return Promise.reject(error);
      }
    );

    // Set up response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        // You could process or log the response here
        // console.log("Got a response:", response.status);
        return response;
      },
      (error) => {
        // Handle any response errors
        console.error("Yikes! Response error:", error.response?.status);
        return Promise.reject(error);
      }
    );

    // Clean up function to remove interceptors when component unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
