import { axiosUser } from "@/axios";

export const AdminUsersApi = {
    createUsers : async (payload) => {
        return await axiosUser.post('/api/admin/users',payload)
    },
    getUsers : async () =>{
        return await axiosUser.get('/api/admin/users')
    },
    updateUsers : async (id,payload) =>{
        return await axiosUser.put(`/api/admin/users/${id}`,{...payload,id})
    },
    deleteUsers : async (id) => {
        return await axiosUser.delete(`/api/admin/users/${id}`)
    }
}