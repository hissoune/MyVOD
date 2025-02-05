import {createReservarion} from '../(services)/api/reservarionapi';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {Reservation} from '../(services)/api/reservarionapi'
import { Session } from './sessionsSlice';


interface ReservationStat  {
    reservations:Reservation[],
    sessionr:any,
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}



const initialState:ReservationStat ={
    reservations: [],
    sessionr:{},
    status: "idle",
    error: null,
}

const ReservationSlice = createSlice({
    name: "reservations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        
    }
})

export const ReservationSliceReducer = ReservationSlice.reducer






