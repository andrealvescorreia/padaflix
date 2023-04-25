import { Link } from "react-router-dom";
import axiosInstance from '../../axios'
import { User } from "../../types/User";


interface NavBarProps {
  user: User | undefined,
  setUser: (user: User | undefined) => void
}

const NavBar = ( {user, setUser}: NavBarProps ) => {
  const logout = async () => {
    axiosInstance.post('/logout')
    .then(()=>{
      setUser(undefined)
    }).catch((err)=>{
      console.log(err.data)
    })
  }

  let navOptions;

  if (user) { // Caso autenticado
    navOptions = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link to="/login" className="nav-link active" onClick={logout} >Logout</Link>
        </li>
      </ul>
    )
  }
  else {// Caso não autenticado...
    navOptions = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link to="/login" className="nav-link active" >Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link active" >Register</Link>
        </li>
      </ul>
    )
  } 

  

  return <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">Home</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        {navOptions}
      </div>
    </div>
  </nav>
}
 
export default NavBar;