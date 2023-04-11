import React, { useContext } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import './private.css'

export const Private = () =>{
    const Auth = useContext(AuthContext)
    const firstName= Auth.user?.name.split(' ')[0] // pegar o primeiro nome
    return(
            <div className="container">
                <h1>Página Privada</h1>
                <h2>Sessão de Usuário</h2>
                <p>Olá {firstName} tudo bem ?</p>
                <p>Email Cadastrado : {Auth.user?.email}</p>
            </div>
    )
}