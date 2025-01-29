import axiosInstance from "./Client";




const getSessionsForMovie = async (movieId:string)=>{
   const response = await axiosInstance.get(`public/sessionsForMovis/${movieId}`);

   return response.data
}








export {getSessionsForMovie};