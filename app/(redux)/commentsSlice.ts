import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "./moviesSlice";
import { User } from "@/types";
import { addComment, getMovieComments } from "../(services)/api/commentsapi";

export interface Comment {
    _id: string;
    movie: Movie; 
    user: User;
    content: string;
}

export interface CommentState {
   comments:Comment[];
   comment:Comment | null;
   status: "idle" | "loading" | "succeeded" | "failed";
   error: string | null;
}


const initialState:CommentState ={
    comments:[],
    comment:null,
    status: "idle",
    error: null
}

export const addcomment =createAsyncThunk(
    "comments/add",
    async ({movieId,content}:{movieId:string;content:string})=>{
        const comment  =  addComment(movieId,content)
        return comment;

    }
);

export const getAllComments = createAsyncThunk(
    "comments/all",
    async (movieId:string)=>{
       const comments = await getMovieComments(movieId);
       return comments
    }
)



const commentSlice = createSlice({
    name:"comments",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addcomment.pending, (state) => {
            state.status = "loading";
          })
          .addCase(addcomment.fulfilled, (state,action: PayloadAction<Comment>)=>{
              state.status = "succeeded";
              state.comment = action.payload
               state.comments.push(action.payload)
          })
          .addCase(addcomment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to add comment";
          })
          .addCase(getAllComments.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getAllComments.fulfilled, (state,action:PayloadAction<Comment[]>)=>{
            state.status = "succeeded";
            state.comments = action.payload
          })
    }

});

export const commentsReducer = commentSlice.reducer