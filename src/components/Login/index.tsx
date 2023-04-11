import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Children, useContext, useState } from 'react'

//import ConfirmAlert from '../ConfirmAlert'
import React from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext.tsx'
import { Navigate,Link , useNavigate, Route, Routes } from 'react-router-dom'
import { Private } from '../../pages/Private/index.tsx'
import { RequireAuth } from '../../contexts/Auth/RequireAuth.tsx'
import Alerta from '../Alerta/index.tsx'
import { error } from 'console'
import './login.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { stringify } from 'querystring'

export default function Login({errorPrivate} : {errorPrivate:string}) {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [errorMessage,setErrorMessage] = useState<string | null>()
  const [showError, setShowError] = useState(false)


  const handleLogin = async () => {
    if(email && password){
      const isLogged = await auth.signin(email,password)
      .then(function(response){
        console.log(response)
        const message = localStorage.getItem('errorMessage')
        setErrorMessage(message)
        setShowError(false)
        if (message !== null){
          setShowError(true)
        }else {
          navigate('/user')
        }

      })
      .catch(function(error){
        console.log(error)
      })
    
    }

    
  }
 const handleStateError= () => {
  localStorage.removeItem('errorMessage')
  setShowError(false)
 }

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Entre na sua conta {errorPrivate}
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
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
                  onChange={e => setEmail(e.target.value)}
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChangeCapture={handleStateError}

                />
              </div>
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
                  onChange={e => setPassword(e.target.value)}
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChangeCapture={handleStateError}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-10 w-5 text-indigo-400 group-hover:text-indigo-300" aria-hidden="true" />
                </span>
                 Entrar 
              </button>
              
              <div className='mx-5 error'>
                <Alerta errorMessage={errorMessage} showError={showError} ></Alerta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
