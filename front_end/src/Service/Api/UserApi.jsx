import { axiosUser } from "@/axios";


export const UserApi = {
    login: async (email,password) =>{
        return await axiosUser.post('/api/login',{email,password})
    },
    logout: async ()=>{
        return await axiosUser.post('/api/logout')
    },
    getUser: async ()=>{
        return await axiosUser.get('/api/me')
    }
}