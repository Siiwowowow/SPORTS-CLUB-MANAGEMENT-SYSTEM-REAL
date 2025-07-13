// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';


// const axiosSecure=axios.create({
//     baseURL: `http://localhost:3000`,
  
// })
// const useAxiosSecure = () => {
//     const {user,logOut}=useAuth()
//     axiosSecure.interceptors.request.use(config=>{
//         config.headers.Authorization=`Bearer ${user.accessToken}` 
//         return config
//     },error=>{
//         return Promise.reject(error)
//     })

//     axiosSecure.interceptors.response.use(
//         response => {
//             return response;
//         }),error => {
//             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//                 // Handle unauthorized or forbidden responses
//               logOut()
//               .then(() => {
//                 // Optionally, you can redirect the user to the login page or show a message
//                 window.location.href = '/login'; // Adjust the path as needed
//               })
//               .catch(logoutError => {   
//                 console.error('Logout error:', logoutError);
//               });
//             }
//             return Promise.reject(error);
//         }
//     return axiosSecure
// };

// export default useAxiosSecure;
import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
const axiosInstance=axios.create({
    baseURL: `http://localhost:3000`,
  
})

const useAxiosSecure = () => {
    const {user,logOut,loading}=useAuth()
 

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => {
                console.log("Logged out due to token issue.");
              })
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosInstance;
};

export default useAxiosSecure;