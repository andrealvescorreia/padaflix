import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from './axios'
import { User, PadariaUser } from "./types/User";
import PadariasList from './routes/PadariasList';
import ChooseProfile from './routes/ChooseProfile';
import RegisterUser from './routes/RegisterUser';
import RegisterBakery from './routes/RegisterBakery';
import NewSubscriptionPlan from './routes/NewSubscriptionPlan';

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

 

  const logout = async () => {
    axiosInstance.post('/logout')
      .then(() => {
        setUser(undefined)
        
      })
      .catch((err) => {
        console.log(err.data)
      })
  }

  function onSuccessfulLogin(){
    fetchUser()
    navigate('/')
  }

  return (
    <div>
      <NavBar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onSuccessfulLogin={onSuccessfulLogin} />} />
        <Route path="/choose-profile" element={<ChooseProfile />} />
        <Route path="/register/user" element={<RegisterUser/>} />
        <Route path="/register/user-padaria" element={<RegisterBakery />} />
        <Route path="/new-subscription-plan" element={<NewSubscriptionPlan />} />
      </Routes>
    </div>
  )
}

export default App
