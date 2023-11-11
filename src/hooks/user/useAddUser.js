import { ENDPOINTS  } from "../endpoints";
import { useAxios } from "../axios/useAxios";

export const useAddUser = () => {
   const axiosInstance = useAxios();

   const saveUser =async (userToSave ) => {
            axiosInstance.post(ENDPOINTS.SIGNUP,userToSave)
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