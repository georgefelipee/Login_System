import React, { useContext } from "react"
import { AuthContext } from "./AuthContext.tsx"
import Login  from '../../components/Login/index.tsx'

export const RequireAuth = ({ children } : {children: JSX.Element}) => {
    const auth = useContext(AuthContext)

    if(!auth.user){
        return <Login errorPrivate={'para acessar essa pagina'} ></Login> 
    }

    return children
    
}