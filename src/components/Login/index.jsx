import { LockClosedIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { useState } from 'react'
import BasicAlerts from '../BasicAlerts'
import ConfirmAlert from '../ConfirmAlert'

export default function Login() {

  const [values,setValues]= useState()

  const [showError,setShowError]= useState(false)
  const [errorMessage,setErrorMessage]= useState()

  const [showSucess,setShowSucess]= useState(false)
  const [sucessMessage,setSucessMessage]= useState()

  const handleClickButton = (evento)=> {
    
    axios.post("http://localhost:3001/auth/login",{
      email: values.email,
      password: values.password,
    }).then(function(response){
      setShowSucess(true)
      setSucessMessage(response.data.msg)
        console.log(response.data.msg)
    }).catch(function(error){
      setShowError(true)
      setErrorMessage(error.response.data.msg)
      console.log(error.response.data.msg)
    })
    
    evento.preventDefault()
  }

  const handleChangeValue = value =>{
    setShowSucess(false)
    setShowError(false)
    setValues(prevValue => ({
        ...prevValue,
        [value.target.name]: value.target.value
    }))
}


  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Entre na sua conta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleClickButton}>
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
                  onChange={handleChangeValue}
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
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
                  onChange={handleChangeValue}
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
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
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-10 w-5 text-indigo-400 group-hover:text-indigo-300" aria-hidden="true" />
                </span>
                Entrar
              </button>
            </div>
            <ConfirmAlert  // Mostrar mensagem de confirmação
            showSucess={showSucess} 
            sucessMessage={sucessMessage} 
            />
            <BasicAlerts // Mostrar mensagem de erro
              showError={showError}
              errorMessage={errorMessage}
            ></BasicAlerts>
          </form>
        </div>
      </div>
    </>
  )
}
