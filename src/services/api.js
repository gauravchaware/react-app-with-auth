/**
 * Auther: Gaurav Chaware
 * Date: 02-02-2020
 * Desc: Axios integration with global error handling for all requests and responce
 */

/* eslint-disable func-names */
import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://swapi.co/api" // This can be replaced with env
});

// Alter defaults after instance has been created
instance.defaults.headers.common.Authorization = "";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
