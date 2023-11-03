import { useAxios } from "../axios/useAxios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../endpoints";

export const useGetPlants =  () => {
   const axiosInstance = useAxios();
   const [data,setDate]=useState([]);
   
   useEffect(()=>{
         axiosInstance.get(ENDPOINTS.PLANT)
         .then((res)=>{
              setDate(res.data)
         })
         .catch((err)=>{
              console.log(err)
         })
    },[])
    
   return {
        plantList:data,
    }
}