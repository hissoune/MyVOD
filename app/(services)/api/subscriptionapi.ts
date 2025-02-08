import axiosInstance from "./Client";


const createSubscription = async (type:string) =>{
     const response  = await  axiosInstance.post('subscriptions',{type})
     
     
     return response.data
};

export {createSubscription}