import { useAxios } from "../axios/useAxios";
import { ENDPOINTS } from "../endpoints";

export const useAddCommand = () => {
    const axiosInstance = useAxios();
    
    const saveCommand = (commandToSave) => {
        axiosInstance.post(ENDPOINTS.COMMAND, commandToSave)
        .then((res)=>{
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return {
        saveCommand
    }
}