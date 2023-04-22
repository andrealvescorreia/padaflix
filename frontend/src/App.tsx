import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import {useEffect, useState} from "react";
import axiosInstance from './axios'

function App() {
  
  const [name, setName] = useState('')

  useEffect(() => {
  (
    async () => {
      axiosInstance.get('/user')
      .then((response) => {
        setName(response.data.name);
      })
      .catch(() => {
        console.log('não autorizado...')
      })
    }
  )();
  })


  return (
    <div>
      <NavBar name={name} setName={setName}/>
     
      <Routes>
        <Route path="/" Component={() => <Home name={name}/>} />
        <Route path="/login" Component={() => <Login setName={setName}/>} />
        <Route path="/register" Component={() => <Register />} />
      </Routes>
    </div>
  )
}

export default App
