import {useContext} from "react";
import { login,register,logout,getme } from "../services/auth.api";
import {AuthContext} from "../auth.context";
export const useAuth = () => {
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const {user,loading,setUser,setLoading}=context;

    const handlelogin=async(email,password)=>{
        setLoading(true);
        try{
            await login(email,password);
            const userData=await getme();
            setUser(userData);
        }catch(err){
            console.error("Login failed:",err);
            throw err;
        }finally{
            setLoading(false);
        }
    }       

    const handleregister=async(username,email,password)=>{
        setLoading(true);
        try{
            await register(username,email,password);
            const userData=await getme();
            setUser(userData);
        }catch(err){
            console.error("Register failed:",err);
            throw err;
        }finally{
            setLoading(false);
        }
    }
    const handlelogout=async()=>{
        setLoading(true);
        try{
            await logout();
            setUser(null);
        }catch(err){
            console.error("Logout failed:",err);
            throw err;
        }finally{
            setLoading(false);
        }
    }
    return{
        user,
        loading,
        login:handlelogin,
        register:handleregister,
        logout:handlelogout
    }
}