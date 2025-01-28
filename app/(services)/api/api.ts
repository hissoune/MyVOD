import axios from "axios";


const login = async ({email,password}:{email:string,password:string}) =>{


    const response = await axios.post(`http://192.168.0.160:8000/api/auth/login`,{
        email,
        password
    });
    return response.data;

}



const register = async ({name,email,password}:{name:string,email:string,password:string}) =>{


        const response = await axios.post(`http://192.168.8.160:8000/api/auth/register`,{
            name,
            email,
            password
        });
        return response.data;
   
    }


    export {login , register}