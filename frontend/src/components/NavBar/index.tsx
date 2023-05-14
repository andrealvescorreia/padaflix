import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo.png';

interface NavBarProps {
  isAuthenticated: boolean,
  logout: () => void;
}

const NavBar = ( { isAuthenticated , logout } : NavBarProps ) => {

  let userNavOption;

  if (isAuthenticated) { // Caso autenticado
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
        
        <Link to="/choose-profile" id={styles.start_now_btn} className={styles.btn} >
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