import axios from "axios";
import axiosInstance from "./Client";


const getMovies = async () =>{


    const response = await axiosInstance.get(`public/movies`);
    return response.data;

};

const AddToFavorite = async (movieId:string)=>{

    const response = await axiosInstance.put(`auth/profile/favorites/${movieId}`);
    
    return response.data;
}
const addOrUpdateRate = async (movieId:string,rating:number)=>{
 
    
    const response = await axiosInstance.patch(`/rating`,{movieId,rating});
    return response.data.movie;
}






    export {getMovies,AddToFavorite,addOrUpdateRate }