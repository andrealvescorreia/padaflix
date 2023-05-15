import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import LoginForm from './routes/LoginForm';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from './axios'
import { User, PadariaUser } from "./types/User";
import PadariasList from './routes/PadariasList';
import ChooseProfile from './routes/ChooseProfile';
import RegisterBekery from './routes/RegisterBakery';
import AddressForm from './components/AddressForm';
import { Endereco } from './types/Endereco';

function App() {


  const [user, setUser] = useState<User | PadariaUser | undefined>()
  
  const fetchUser = async () => {
    axiosInstance.get('/user')
    .then((response) => {
      setUser(response.data);
    })
    .catch(() => {
      console.log('não autorizado...')
    })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    axiosInstance.post('/login', {
      email, 
      password
    })
    .then(() => {
      fetchUser()
      navigate('/')// redireciona para a homepage
    })
    .catch((err) => {
      alert(err)
    })
  }

  const logout = async () => {
    axiosInstance.post('/logout')
    .then(() => {
      setUser(undefined)
    })
    .catch((err)=>{
      console.log(err.data)
    })
  }

  /*
  // descomente aqui para testar o formulario de endereco

  function onSubmit(endereco: Endereco){
    alert(JSON.stringify(endereco))
  }

  function onGoBack(){
    alert('voltar')
  }

  return (
    <AddressForm onSubmit={onSubmit} onGoBack={onGoBack}/>
  )
  */

  return (
    <div>
      <NavBar isAuthenticated = { user ? true : false } logout={logout} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<LoginForm onSubmit={login}/>} />
        <Route path="/choose-profile" element={<ChooseProfile />} />
        <Route path="/padarias" element={<PadariasList />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/register/user-padaria" element={<RegisterBekery />} />
      </Routes>
    </div>
  )
}

export default App
