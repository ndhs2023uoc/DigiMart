import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Custom hook to fetch and manage user data
const useUser = () => {
  // Get the user from our auth hook
  const { user } = useAuth();

  // Get our secure axios instance
  const axiosSecure = useAxiosSecure();

  // Use react-query to fetch and cache user data
  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    // Unique key for this query
    queryKey: ["user", user?.email],

    // Function to fetch the data
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },

    // Only run the query if we have a user email and token
    enabled: !!user?.email && !!localStorage.getItem("token"),
  });

  // Return the user data and related functions
  return { currentUser, isLoading, refetch };
};

export default useUser;
