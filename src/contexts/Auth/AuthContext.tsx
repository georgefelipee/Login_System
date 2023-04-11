import { createContext } from "react";
import { User } from "../../types/User.ts";

export type AuthContextType = {
    user: User | null;
    signin: (email:string, password:string) => Promise<boolean | void> 
    signout: () => void
    
} 

export const AuthContext = createContext<AuthContextType>(null!)