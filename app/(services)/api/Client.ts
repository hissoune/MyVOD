import { RootState } from '@/app/(redux)/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector } from 'react-redux';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.8.254:8000/api/',
});
axiosInstance.interceptors.request.use(
 async function (config) {
    const token =await AsyncStorage.getItem('token');
    
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type']='multipart/form-data'
    }

    return config;
  },
  function (error) {
     
    return Promise.reject(error); 
  }
);

export default axiosInstance;
