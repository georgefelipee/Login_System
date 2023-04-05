import './App.css';
import Login from './components/Login';
import Register from './components/Register/Register';
import { Link, Route,Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App-container">
      <header> 
        <h1> Sistema de Login </h1>
        <nav className='navegation'>
          <Link to="/auth/register"> Registrar </Link>
          <Link to="/auth/login"> Entrar </Link>
        </nav>
      </header>
      <hr></hr>
      <Routes>
          <Route path='/auth/register' element={<Register/>}></Route>
          <Route path='/auth/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;


