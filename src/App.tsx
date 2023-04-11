import React, { useContext } from 'react';
import './App.css';
import Login from './components/Login/index.tsx';
import Register from './components/Register/Register.tsx';
import { Link, Route,Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home/index.tsx';
import { Private } from './pages/Private/index.tsx';
import { RequireAuth } from './contexts/Auth/RequireAuth.tsx';
import { AuthContext } from './contexts/Auth/AuthContext.tsx';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple, red, indigo } from '@mui/material/colors';
//onClick={handleLogout}> Sair


function App() {
  const auth = useContext(AuthContext) 
  const navigate = useNavigate()
  const handleLogout = async () => {   
     auth.signout();
      navigate('/') 
  }
  const cor = indigo[500];
  return (

    <div className="App-container">
      <header> 
        <h1> Sistema de Login </h1>
        <nav className='navegation'>
          <Link to="/">Home</Link>
          { auth.user ? "" :<Link to="/auth/register"> Registrar </Link>}
          { auth.user ? "" : <Link to="/auth/login"> Entrar </Link>}
          <Link to="/user"> Usuário </Link>
          {auth.user && <Button size='small' color="primary" onClick={handleLogout} variant="contained">Sair</Button> }
        </nav>
      </header>
      <hr></hr>
      <Routes>
          <Route path='/' element={ <Home /> }></Route>
          <Route path='/auth/register' element={<Register/>}></Route>
          <Route path='/auth/login' element={<Login errorPrivate={''}/>}></Route>
          <Route path='/user' element={ <RequireAuth><Private/></RequireAuth> }></Route>
      </Routes>
    </div>
  );
}

export default App;


