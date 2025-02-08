import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSubscription } from "../(services)/api/subscriptionapi";



interface Subscription {
    user: string;
    type: string;
    startDate: string;
    endDate: string;
  }

  export const createsubscription = createAsyncThunk(
    "subscription/create",
    async (type:string) => {
     
        const response = await createSubscription(type)
        return response;
      
    }
  );

  interface SubscriptionState {
    subscription: Subscription | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: SubscriptionState = {
    subscription: null,
    loading: false,
    error: null,
  };
  
  const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createsubscription.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createsubscription.fulfilled, (state, action: PayloadAction<Subscription>) => {
          state.loading = false;
          state.subscription = action.payload;
        })
        .addCase(createsubscription.rejected, (state, action) => {
          state.loading = false;
        });
    },
  });
  
  export const  subscriptionReducer = subscriptionSlice.reducer;