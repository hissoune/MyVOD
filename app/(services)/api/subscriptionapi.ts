import axiosInstance from "./Client";


const createSubscription = async (type:string) =>{
     const response  = await  axiosInstance.post('subscriptions',{type})
     
     
     return response.data
};

const isSubscriped = async () =>{
    const response  = await  axiosInstance.get('subscriptions/isSubscriped')
    
    
    return response.data
};

export {createSubscription,isSubscriped}