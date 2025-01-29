import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AddToFavorite, getMovies } from "@/app/(services)/api/moviesapi";
import { getSessionsForMovie } from "../(services)/api/sessionsapi";
import { Movie } from "./moviesSlice";
export interface Room {
    _id: number;
    name: string;
    capacity: number;
}
export interface Session {
  _id: number;
  movie: Movie;
  room: Room;
  seats: number[];
  available:boolean;
  dateTime:string;
  price:number
}

interface SessionState {
  sessions: Session[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SessionState = {
    sessions: [],
    status: "idle",
    error: null,
};

export const fetchSessionsForMovies = createAsyncThunk(
  "movies/fetchSessionsForMovies",
  async (movieId:string) => {
    const sessions = await getSessionsForMovie(movieId);
    return sessions;
  }
);


const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionsForMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSessionsForMovies.fulfilled, (state, action: PayloadAction<Session[]>) => {
        state.status = "succeeded";
        state.sessions = action.payload;
      })
      .addCase(fetchSessionsForMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      })
      
  },
});

export const sessionsReducer=  sessionsSlice.reducer;
