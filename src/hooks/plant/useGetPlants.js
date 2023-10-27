import axios from "axios";
import { useAxios } from "../axios/useAxios";
import { useEffect, useState } from "react";

export const useGetPlants =  () => {
   const axiosInstance=useAxios(); 
   const [data,setDate]=useState([]);
   
   useEffect(()=>{
         axiosInstance.get("/")
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