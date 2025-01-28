import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { moviesReducer } from "./moviesSlice";

 const store = configureStore({
    reducer:{
            auth:authReducer,
            movies: moviesReducer,

    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;