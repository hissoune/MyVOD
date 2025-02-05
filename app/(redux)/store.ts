import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { moviesReducer } from "./moviesSlice";
import { sessionsReducer } from "./sessionsSlice";
import { ReservationSliceReducer } from "./reservationSlice";

 const store = configureStore({
    reducer:{
            auth:authReducer,
            movies: moviesReducer,
            sessions:sessionsReducer,
            reservations:ReservationSliceReducer

    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;