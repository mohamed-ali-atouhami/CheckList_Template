import { UserApi } from "@/Service/Api/UserApi";
import { createContext, useContext, useState } from "react"

const UserStateContext = createContext({
    user:{},
    isAuthenticate:false,
    setIsAuthenticate: ()=>{},
    setUser:()=>{},
    setToken:(token)=>{},
    token:null,
    logout:()=>{},
    login:(email,password)=>{}
})

export default function UserContext({children}) {
    const [user,setUser]=useState();
    const [isAuthenticate,_setIsAuthenticate]=useState(JSON.parse(localStorage.getItem("authenticate")) || false)
    const [token,_setToken]=useState(localStorage.getItem("token") || null)
    const login = async (email,password) => {
        //await UserApi.getCSRF_Token()
        return UserApi.login(email,password)
    }
    const logout = ()=>{
        setUser({})
        setIsAuthenticate(false)
        setToken(null);

    };
    const setIsAuthenticate = (isAuth)=>{
        if (isAuth) {
			localStorage.setItem('authenticate', JSON.stringify(isAuth));
		} 
        else {
			localStorage.removeItem('authenticate');
		}
		_setIsAuthenticate(isAuth);
    }
    const setToken = (token)=>{
        if (token) {
			localStorage.setItem('token', token);
		}
        else{
            localStorage.removeItem('token')
        }
        _setToken(token)
    }
    
    return(
        <>
            <UserStateContext.Provider 
                value={{user,login,logout,isAuthenticate,setIsAuthenticate,setUser,setToken}}
            >
                {children}
            </UserStateContext.Provider>
        </>
    )
};
export const useUserContext = ()=> useContext(UserStateContext)
