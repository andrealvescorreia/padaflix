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
import { enqueueSnackbar } from 'notistack';
import PadariasList from './routes/PadariasList';
import Loading from './components/Loading';


function App() {
  const [user, setUser] = useState<User | PadariaUser | undefined>()
  const [doneFetchingUser, setDoneFetchingUser] = useState(false)
  const navigate = useNavigate()

  const fetchUser = async () => {
    setDoneFetchingUser(false)
    axiosInstance.get('/user')
    .then((response) => {
      setUser(response.data);
    })
    .catch((err) => {
      setUser(undefined)
      if(!err.response) {
        enqueueSnackbar('Servidor do padaflix fora do ar', { 
          variant: 'error', 
          persist: true, 
          preventDuplicate: true
        })
      }
      else {
        console.log(err.response.data)
      }
    })
    .finally(()=>setDoneFetchingUser(true))
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
      enqueueSnackbar('Ocorreu um erro', { variant: 'error'})
      console.log(err.response.data)
    })
  }
  
  async function onSuccessfulLogin(){
    await fetchUser().then(()=>navigate('/inicio'))
  }

  function notLoggedInRoutes(){
    return <>
      <Route path="/padarias"              element={<PadariasList user={user} />} />
      <Route path="/padarias/:id" element={<PadariaProfile user={user} afterSuccessfulSubscription={fetchUser} />}/>
      <Route path="/login"                 element={<Login onSuccessfulLogin={onSuccessfulLogin} />} />
      <Route path="/choose-profile"        element={<ChooseProfile />} />
      <Route path="/register/user"         element={<RegisterUser/>} />
      <Route path="/register/user-padaria" element={<RegisterBakery />} />
    </>
  }

  function userRoutes(){
    return <>
      <Route path="/padarias"     element={<PadariasList user={user} />} />
      <Route path="/padarias/:id" element={<PadariaProfile user={user} afterSuccessfulSubscription={fetchUser} />}/>
    </>
  }

  function padariaRoutes(){
    return <>
      <Route path="/padaria-planos"     element={<PlanosPadaria padaria={user} />} />
      <Route path="/padaria-planos/new" element={<NewSubscriptionPlan />} />
      <Route path="/padaria-assinantes" element={<AssinantesPadaria padariaUser={user} />} />
      <Route path="/padaria-avaliacoes" element={<AvaliacoesPadaria />} />
      <Route path="/padaria-horarios"   element={<HorariosPadaria />} />
      <Route path="/padaria-perfil"     element={<PerfilPadaria />} />
      <Route path="/padaria-endereco"   element={<EnderecoPadaria />} />
    </>
  }


  return (
    <div>
      { 
        !doneFetchingUser && <Loading/>
      }
      {
        doneFetchingUser && (
          isPadariaUser(user) 
          ? <SideBarPadaria padaria={user} logout={logout}/>  
          : <NavBar         user={user}    logout={logout} />
        )
      }
      <Routes>
        <Route path="/" element={<DefaultRoute/>}/>
        {
          doneFetchingUser && !user &&
          <Route path="/inicio" element={ <Home user={undefined} /> }/>
        }
        {
          doneFetchingUser && user &&
          <Route path="/inicio" element={ <Home user={user} /> }/>
        }
        {
          doneFetchingUser && !user &&
          notLoggedInRoutes()
        }
        {
          doneFetchingUser && isUser(user) &&
          userRoutes()
        }
        {
          doneFetchingUser && isPadariaUser(user) &&
          padariaRoutes()
        }
        {doneFetchingUser && <Route path="*" element={<PageNotFound />} />}
      </Routes>
    </div>
  )
}

function DefaultRoute() {
  const navigate = useNavigate()
  useEffect(() => navigate('/inicio'), [])
  return <></>
}

function PageNotFound() {
  return <h2>404 Página não encontrada</h2>
}

export default App