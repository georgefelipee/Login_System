import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import axios from 'axios';
//import BasicAlerts from '../BasicAlerts';
import AlertSucess from '../AlertSucess/index.tsx'
import BasicAlerts from  '../BasicAlerts/index.tsx'
import { Link, Routes,Route, Navigate, useNavigate } from 'react-router-dom';

import validator from 'validator'
import './resgister.css'
import React from 'react';

export default function Register() {
    const navigate = useNavigate()
    const [values,setValues]= useState<object| any>()

    const [emailError, setEmailError] = useState< React.ChangeEvent<HTMLInputElement> | string >()


    const [showError,setShowError]= useState(false)
    const [errorMessage,setErrorMessage]= useState()

    const [showSucess,setShowSucess]= useState(false)
    const [sucessMessage,setSucessMessage]= useState()

    const validateEmail = (e: any) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
          setEmailError('Email Válido :)')
        } else {
          setEmailError('Email inválido!')
        }
      }

    const handleClickButton = (evento: { preventDefault: () => void; }) => {
        axios.post("http://localhost:3001/auth/register",{
            name: values.name,
            email: values.email,
            password: values.password,
            confirmpassword: values.confirmpassword
        }).then(function (response){
            setShowSucess(true)
            setSucessMessage(response.data.msg)
            console.log(response.data.msg)
            navigate('/auth/login')
        }).catch(function (error){
            setShowError(true)
            const  mensagem =  error.response.data
            setErrorMessage(mensagem.msg)
            console.log(mensagem)
        })
        
        evento.preventDefault()
    }

    const handleChangeValue = (value: { target: { name: any; value: any; }; }) =>{
        setShowError(false)
        setValues((prevValue: any ) => ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
        
        console.log(values)
    }
    const handleEmailError = () =>{
        setEmailError('')
    }
    return (
        <>
            <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Registre sua conta 
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" 
                        onSubmit={handleClickButton}
                        >
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                             <div>
                                <label htmlFor="name" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Name" 
                                    onChange={handleChangeValue}
                                    />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email address" 
                                    onChange={handleChangeValue}
                                    onChangeCapture={
                                        (e)=> validateEmail(e)
                                    }
                                    />
                            </div>
                            <p className='errorEmail'>
                                 <> {emailError}</>
                            </p>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password" 
                                    onChange={handleChangeValue}
                                    onChangeCapture={handleEmailError}
                                    />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Confirm Password" 
                                    onChange={handleChangeValue}
                                    />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    <Link to="/auth/login">  
                                        Já possui uma conta ? Faça o Login
                                    </Link>
                                   
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                    <BasicAlerts showError={showError} errorMessage={errorMessage} ></BasicAlerts>
                    <AlertSucess showSucess={showSucess} sucessMessage={sucessMessage} ></AlertSucess>
                </div>
            </div>
            
        </>
    );
}
