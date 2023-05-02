import { Link } from "react-router-dom";
import axiosInstance from '../../axios'
import { User } from "../../types/User";
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo.png';

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

  let userNavOption;

  if (user) { // Caso autenticado
    userNavOption = (
      <div className={styles.navOptions}>
        
        <Link to="/login" id={styles.logout_btn} onClick={logout} >
          Sair
        </Link>
        
      </div>
    )
  }
  else {// Caso não autenticado...
    userNavOption = (
      <div className={styles.navOptions}>
        
        <Link to="/login"  id={styles.login_btn} className={styles.btn} >
          Login
        </Link>
        
        <Link to="/register" id={styles.start_now_btn} className={styles.btn} >
          Começe Agora
        </Link>
        
      </div>

    )
  } 

  
  return <nav id={styles.navbar}>
    <div className={styles.defaultNavOptions}>
      <Link to="/"   className={styles.option} >
        Início
      </Link>
          
      <Link to="/padarias" className={styles.option} >
        Padarias
      </Link>
    </div>

    <div className={styles.logoContainer}>
      <img src={Logo} className={styles.logo} alt="logo padaflix"/>
    </div>

    
    {userNavOption}
  </nav>;
  
}
 
export default NavBar;