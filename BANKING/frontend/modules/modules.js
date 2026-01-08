import axios from "axios";

/**
 * axios instance for API calls
 * @param {string|null} accessToken 
 */
export const http = (accessToken = null) => {
  const instance = axios.create({
    // Ensure VITE_BASEURL is defined in your .env file
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add token to headers if the user is authenticated
  if (accessToken) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }

  return instance;
};

/**
 * Utility to trim whitespace from all string values in an object.
 * This resolves the "does not provide an export named 'trimData'" error.
 * @param {Object} data 
 */
export const trimData = (data) => {
  if (!data) return {};
  const trimmed = {};
  
  Object.keys(data).forEach((key) => {
    const value = data[key];
    // If the value is a string, trim it; otherwise, keep it as is
    trimmed[key] = typeof value === "string" ? value.trim() : value;
  });
  
  return trimmed;
};