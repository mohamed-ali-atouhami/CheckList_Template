import { axiosUser } from "@/axios";

export const ShiftsApi = {
    createShift : async (payload) => {
        return await axiosUser.post('/api/admin/shifts',payload)
    },
    getShift : async () =>{
        return await axiosUser.get('/api/admin/shifts')
    },
    updateShift : async (id,payload) =>{
        return await axiosUser.put(`/api/admin/shifts/${id}`,{...payload,id})
    },
    deleteShift : async (id) => {
        return await axiosUser.delete(`/api/admin/shifts/${id}`)
    }
}