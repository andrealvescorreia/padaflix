import './App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom';
import {useEffect, useState} from "react";

function App() {
 
  return (
    <div className="App">
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App
