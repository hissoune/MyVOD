import axiosInstance from "./Client";


const login = async ({email,password}:{email:string,password:string}) =>{


    const response = await axiosInstance.post(`auth/login`,{
        email,
        password
    });
    return response.data;

}



const register = async ({name,email,password}:{name:string,email:string,password:string}) =>{


        const response = await axiosInstance.post(`auth/register`,{
            name,
            email,
            password
        });
        return response.data;
   
    }


    export {login , register}