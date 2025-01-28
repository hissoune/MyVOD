import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, Dispatch } from "@reduxjs/toolkit";


const loadUserFromAsyncStrg = async ()=>{
    try {
        const user = await AsyncStorage.getItem('userInfo');
        const token = await AsyncStorage.getItem('token')
        return user ? JSON.parse(user):null;
    } catch (error) {
        return null
    }
}

const initialState = {
    user:null,
    token:null,
    isLoading:true
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginAction:(state,action)=>{
            state.user = action.payload;
            state.isLoading=false;
            AsyncStorage.setItem('userInfo', JSON.stringify(action.payload.user))
            AsyncStorage.setItem('token',JSON.stringify(action.payload.token) )
        },
        logoutAction:(state)=>{
            state.user = null;
            state.isLoading=false;
            AsyncStorage.removeItem('userInfo');
            AsyncStorage.removeItem('token');
        },
        setUserInfo:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoading=false;

        }
    }
});

export const {loginAction,logoutAction,setUserInfo} = authSlice.actions;


export const  loadUser =()=>async (dispatch:Dispatch)=>{
    const userInfo = await loadUserFromAsyncStrg();
    if (userInfo) {
        dispatch(setUserInfo(userInfo))
    }

}

export const authReducer = authSlice.reducer;
