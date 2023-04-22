import { Link } from "react-router-dom";


const NavBar = () => {

  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
  }

  return <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">Home</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link to="/login" className="nav-link active" >Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link active" >Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link active" onClick={logout} >Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}
 
export default NavBar;