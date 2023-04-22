import { Link } from "react-router-dom";
import axiosInstance from '../../axios'

const NavBar = ( props : { name : string, setName: (name: string) => void } ) => {

  const logout = async () => {
    axiosInstance.post('/logout')
    .then(()=>{
      props.setName('');
    }).catch((err)=>{
      console.log(err.data)
    })
  }

  let menu;

  if(props.name === ''){// Caso não autenticado...
    menu = (
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
  else { // Caso autenticado...
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link to="/login" className="nav-link active" onClick={logout} >Logout</Link>
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
        {menu}
      </div>
    </div>
  </nav>
}
 
export default NavBar;