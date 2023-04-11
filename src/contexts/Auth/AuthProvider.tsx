import { JsxElement } from "typescript"
import { AuthContext } from "./AuthContext.tsx"
import { useEffect, useState } from "react"
import { User } from "../../types/User"
import { useApi } from "../../hooks/useApi.ts"
import React from "react"

export const AuthProvider = ({children} : {children : JSX.Element}) => {
    const [user,setUser] = useState<User | null>(null);
    const [errorMessage,setErrorMessage]= useState<string| null>('')

    const api = useApi()
    useEffect(()=>{
        console.log(localStorage.getItem('errorMessage'))
        const validateToken= async () => {
            const storageData = localStorage.getItem('authToken')
            console.log(`token : ${storageData}`)
            if(storageData){
                const data = await api.validateToken(storageData)
                if(data.user){
                    setUser(data.user)
                }
            }
        }
        validateToken()
        localStorage.removeItem('errorMessage')
    },[])

    const signin = async (email:string, password:string) => {
        const data = await api.signin(email,password)
        .then(function(response){
            const dataUser = response.user
            setUser(dataUser)
            localStorage.setItem('authToken', response.token)
            return dataUser
            
        })
        .catch(function(error){
            const menssageError = error.response.data.msg
            setErrorMessage(menssageError)
            localStorage.setItem('errorMessage', menssageError)
        })        
    }

    const signout = async() => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('errorMessage')
        setUser(null); 
        await api.logout();
    }

    return(
        <AuthContext.Provider value={{user, signin, signout,}}>
            {children}
        </AuthContext.Provider>
    )
}