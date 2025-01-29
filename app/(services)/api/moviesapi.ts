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






    export {getMovies,AddToFavorite }