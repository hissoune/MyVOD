import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AddToFavorite, getMovies } from "@/app/(services)/api/moviesapi";
import { getSessionsForMovie } from "../(services)/api/sessionsapi";
import { Movie } from "./moviesSlice";
import { createReservarion } from "../(services)/api/reservarionapi";
export interface Room {
    _id: number;
    name: string;
    capacity: number;
}
export interface Session {
  _id: number;
  movie: Movie;
  room: Room;
  seats: [{number:number,available:boolean}];
  available:boolean;
  dateTime:string;
  price:number
}

interface SessionState {
  sessions: Session[];
  session:Session |null,
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SessionState = {
    sessions: [],
    session:null,
    status: "idle",
    error: null,
};

export const createReservation = createAsyncThunk(
  "reservations/createReservation",
  async ({ session, seats }: { session: string; seats: number }) => {
      const reservation = await createReservarion(session, seats);
      
      return reservation;
  }
);

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
  reducers: {

    updateSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
    }
  },
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
      .addCase(createReservation.pending ,(state)=>{
        state.status = 'loading'
    })
    .addCase(createReservation.fulfilled, (state ,action:PayloadAction<Session>)=>{
        
        state.status ="succeeded",
        state.session = action.payload
    })
    .addCase(createReservation.rejected, (state,action)=>{
        state.status ="failed",
        state.error = action.error.message || "Failed to fetch movies"

    })
    
      
  },
});
export const { updateSession } = sessionsSlice.actions;
export const sessionsReducer=  sessionsSlice.reducer;
