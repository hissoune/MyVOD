import axiosInstance from "./Client"

export interface Reservation  {
    session:string,
    seats:number
}



const  createReservarion =async (session:string,seats:number)=>{

    const response = await axiosInstance.post('reservations',{session,seats});
    return response.data;
}

export {createReservarion};