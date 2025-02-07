import axiosInstance from "./Client";


const getMovieComments = async (movieId:string)=>{
    const response = await axiosInstance.get(`/comments/movie/${movieId}`);
    return response.data.comments
}

 const addComment = async ( movieId:string, content:string )=>{
     
    const response = await axiosInstance.post('/comments',{movieId,content});
     
      return response.data.comment
}

export {addComment,getMovieComments}