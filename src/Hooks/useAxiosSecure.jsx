import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure=axios.create({
    baseURL: `http://localhost:3000`,
  
})
const useAxiosSecure = () => {
    const {user,logOut}=useAuth()
    axiosSecure.interceptors.request.use(config=>{
        config.headers.Authorization=`Bearer ${user.accessToken}` 
        return config
    },error=>{
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(
        response => {
            return response;
        }),error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Handle unauthorized or forbidden responses
              logOut()
              .then(() => {
                // Optionally, you can redirect the user to the login page or show a message
                window.location.href = '/login'; // Adjust the path as needed
              })
              .catch(logoutError => {   
                console.error('Logout error:', logoutError);
              });
            }
            return Promise.reject(error);
        }
    return axiosSecure
};

export default useAxiosSecure;