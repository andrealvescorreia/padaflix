import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from './axios'
import { User, PadariaUser, isUser, isPadariaUser } from "./types/User";
import ChooseProfile from './routes/ChooseProfile';
import RegisterUser from './routes/RegisterUser';
import RegisterBakery from './routes/RegisterBakery';
import NewSubscriptionPlan from './routes/NewSubscriptionPlan';
import SideBarPadaria from './components/SideBarPadaria';
import PlanosPadaria from './routes/routesPadaria/PlanosPadaria';
import AssinantesPadaria from './routes/routesPadaria/AssinantesPadaria';
import AvaliacoesPadaria from './routes/routesPadaria/AvaliacoesPadaria';
import HorariosPadaria from './routes/routesPadaria/HorariosPadaria';
import PerfilPadaria from './routes/routesPadaria/PerfilPadaria';
import EnderecoPadaria from './routes/routesPadaria/EnderecoPadaria';
import PadariaProfile from './routes/PadariaProfile';
import { useSnackbar } from 'notistack';

function App() {
  const [user, setUser] = useState<User | PadariaUser | undefined>()
  const { enqueueSnackbar } = useSnackbar();
  
  const fetchUser = async () => {
    axiosInstance.get('/user')
    .then((response) => {
      setUser(response.data);
    })
    .catch((err) => {
      if(!err.response) {
        enqueueSnackbar('Servidor do padaflix fora do ar', { variant: 'error'})
      }
      setUser(undefined)
    })
  }

  useEffect(() => {
    fetchUser()
  }, [])


  const logout = async () => {
    axiosInstance.post('/logout')
      .then(() => {
        setUser(undefined)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  
  const navigate = useNavigate()
  function onSuccessfulLogin(){
    fetchUser()
    navigate('/')
  }

  return (
    <div>
      {
        isPadariaUser(user) 
        ? <SideBarPadaria padaria={user} logout={logout}/>  
        : <NavBar user={user} logout={logout} />
      }
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onSuccessfulLogin={onSuccessfulLogin} />} />
        <Route path="/choose-profile" element={<ChooseProfile />} />
        <Route path="/register/user" element={<RegisterUser/>} />
        <Route path="/register/user-padaria" element={<RegisterBakery />} />
        
        <Route
          path="padaria/:id"
          element={<PadariaProfile />}
        />
     
        <Route path="/padaria-planos" element={<PlanosPadaria padaria={user} />} />
        <Route path="/padaria-planos/new" element={<NewSubscriptionPlan />} />
        <Route path="/padaria-assinantes" element={<AssinantesPadaria />} />
        <Route path="/padaria-avaliacoes" element={<AvaliacoesPadaria />} />
        <Route path="/padaria-horarios" element={<HorariosPadaria />} />
        <Route path="/padaria-perfil" element={<PerfilPadaria />} />
        <Route path="/padaria-endereco" element={<EnderecoPadaria />} />

      </Routes>
    </div>
  )
}

export default App
