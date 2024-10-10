import { axiosUser } from "@/axios";

export const LinesApi = {
    createLines : async (payload) => {
        return await axiosUser.post('/api/admin/lines',payload)
    },
    getLines : async () =>{
        return await axiosUser.get('/api/admin/lines')
    },
    updateLines : async (id,payload) =>{
        return await axiosUser.put(`/api/admin/lines/${id}`,{...payload,id})
    },
    deleteLines : async (id) => {
        return await axiosUser.delete('/api/admin/lines/' + id)
    }
}