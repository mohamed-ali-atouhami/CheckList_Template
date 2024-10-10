import { axiosUser } from "@/axios";

export const StationsApi = {
    createStations : async (payload) => {
        return await axiosUser.post('/api/admin/stations',payload)
    },
    getStations : async () =>{
        return await axiosUser.get('/api/admin/stations')
    },
    updateStations : async (id,payload) =>{
        return await axiosUser.put(`/api/admin/stations/${id}`,{...payload,id})
    },
    deleteStations : async (id) => {
        return await axiosUser.delete('/api/admin/stations/' + id)
    }
}