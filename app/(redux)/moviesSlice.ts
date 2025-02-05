import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AddToFavorite, getMovies } from "@/app/(services)/api/moviesapi";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration:number;
  posterImage:string
}

interface MoviesState {
  movies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
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


const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
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
      
  },
});

export const moviesReducer=  moviesSlice.reducer;
