import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import {useEffect, useState} from "react";
import axiosInstance from './axios'

function App() {
  
  type User = {
    id: number,
    name: string,
    email: string,
  }

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
        <Route path="/" Component={() => <Home user={user}/>} />
        <Route path="/login" Component={() => <Login setUser={setUser}/>} />
        <Route path="/register" Component={() => <Register />} />
      </Routes>
    </div>
  )
}

export default App
