import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types";
import { AddToFavorite } from "../(services)/api/moviesapi";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  try {
    const user = await AsyncStorage.getItem("userInfo");
    const token = await AsyncStorage.getItem("token");
    return user ? { user: JSON.parse(user), token } : null;
  } catch (error) {
    return null;
  }
});


export const addFavorite =createAsyncThunk(
    "movies/favorites",
    async (movieId:string) => {
        
        const user = await AddToFavorite(movieId);
        return user;
      }
)

const initialState: {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated:boolean;
} = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(action.payload.token);
      
      state.isLoading = false;
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      AsyncStorage.setItem("token", action.payload.token);
    },
    logoutAction: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      AsyncStorage.removeItem("userInfo");
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addFavorite.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(addFavorite.fulfilled, (state,action)=>{
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(addFavorite.rejected, (state)=>{
        state.isLoading = false;

      })
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export const authReducer = authSlice.reducer;
