import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addOrUpdateRate, AddToFavorite, getMovies } from "@/app/(services)/api/moviesapi";

export interface Movie {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;
  duration:number;
  posterImage:string;
  averageRating:number;
  genre:string[];
  ratings:[{userId:string,rating:number}]
}

interface MoviesState {
  movies: Movie[];
  movie:Movie | null
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  movie:null,
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk<Movie[]>(
  "movies/fetchMovies",
  async () => {
    const movies = await getMovies();
    return movies;
  }
);
export const rateMmovie = createAsyncThunk(
  "movies/rating",
  async ({movieId, rating}:{movieId:string;rating:number})=>{
    
    const movie = await addOrUpdateRate(movieId, rating);

    
    return movie;
  }
)


const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
     updateMovie: (state, action: PayloadAction<Movie>) => {
          state.movie = action.payload;
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      })
      .addCase(rateMmovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rateMmovie.fulfilled,(state, action: PayloadAction<Movie>) => {
        state.status = "succeeded";
        state.movie = action.payload;
        state.movies = state.movies.map(movie =>
          movie._id === action.payload._id ? action.payload : movie
      );
      })
      .addCase(rateMmovie.rejected,  (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      })
  },
});
export const { updateMovie } = moviesSlice.actions;

export const moviesReducer=  moviesSlice.reducer;
