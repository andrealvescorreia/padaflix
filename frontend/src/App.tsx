import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import {useEffect, useState} from "react";
import axiosInstance from './axios'
import { User } from "./types/User";
import PadariasList from './routes/PadariasList';
import ChooseProfile from './routes/ChooseProfile';

function App() {

  const [user, setUser] = useState<User>()

  useEffect(() => {
  (
    async () => {
      axiosInstance.get('/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        console.log('não autorizado...')
      })
    }
  )();
  })


  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/choose-profile" element={<ChooseProfile />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/padarias" element={<PadariasList />} />
      </Routes>
    </div>
  )
}

export default App
