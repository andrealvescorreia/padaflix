import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from './axios'
import { User } from "./types/User";
import PadariasList from './routes/PadariasList';
import ChooseProfile from './routes/ChooseProfile';
import RegisterBekery from './routes/RegisterBakery';

function App() {

  const [user, setUser] = useState<User>()
  
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

  const submit = async (email: string, password: string) => {
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

  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<Login onSubmit={submit}/>} />
        <Route path="/choose-profile" element={<ChooseProfile />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/padarias" element={<PadariasList />} />
        <Route path= "/register/user-padaria" element={<RegisterBekery />} />
      </Routes>
    </div>
  )
}

export default App
