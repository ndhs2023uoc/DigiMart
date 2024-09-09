import { useEffect, useMemo } from "react";
import axios from "axios";

const useAxiosFetch = () => {
  // Create a memoized instance of axios with a base URL
  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:3000/",
      }),
    []
  );

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Hey, we can add some cool stuff here like auth tokens
        // config.headers.Authorization = `Bearer ${yourAuthToken}`;
        return config;
      },
      (error) => {
        // Oops, something went wrong with the request
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        // We got a response! Let's log it for fun
        console.log("Response received:", response.status);
        return response;
      },
      (error) => {
        // Uh-oh, the server didn't like our request
        console.error("Response error:", error.response?.status);
        return Promise.reject(error);
      }
    );

    // Clean up our interceptors when we're done
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
