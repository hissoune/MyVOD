import axios from "axios";


const getMovies = async () =>{


    const response = await axios.get(`http://192.168.8.254:8000/api/public/movies`);
    return response.data;

}






    export {getMovies }