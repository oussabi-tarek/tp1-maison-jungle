import axios from "axios";
import { useEffect,useState } from "react";
import { ENDPOINTS } from "../endpoints";

export const useAxios = () => {
   const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_VITE_API_BASE_URL,
     });

     useEffect(()=>{
        const interval=setInterval(()=>{
            axiosInstance.post(ENDPOINTS.REFRESH, {refreshToken:localStorage.getItem("refreshToken") }).then((res)=>{
                localStorage.setItem("token", res.data.token);
            }).catch((err)=>{
                console.log(err);
            })  
        },24*60*60*1000);
        return()=>clearInterval(interval);
     },[]);
     useEffect(()=>{
       const intervalRefreshToken=setInterval(()=>{
          window.location.href="/login";
       },3*24*60*60*1000);
     },[])

    axiosInstance.interceptors.request.use(  
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["x-access-token"] = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        });

     return axiosInstance;
}