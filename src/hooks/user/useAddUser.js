import { ENDPOINTS  } from "../endpoints";
import { useAxios } from "../axios/useAxios";
import { useEffect, useState } from "react"; 

export const useAddUser = () => {
   const axiosInstance = useAxios();

   const saveUser =async (userToSave ) => {
            axiosInstance.post(ENDPOINTS.USER,userToSave)
            .then((res)=>{
                    console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
   }
     return {
            saveUser,
     }
   
}