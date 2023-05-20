import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo.png';
import { PadariaUser, User, isPadariaUser, isUser } from "../../types/User";

interface NavBarProps {
  user: User | undefined | PadariaUser
  logout: () => void;
}

const NavBar = ( {user, logout} : NavBarProps ) => {

  let leftSideNavOptions;
  let rigthSideNavOptions;

  if (user) {
    if (isUser(user)) {
      leftSideNavOptions = (
        <div className={styles.defaultNavOptions}>
          <Link to="/"   className={styles.option} >
            Início
          </Link>
              
          <Link to="/padarias" className={styles.option} >
            Padarias
          </Link>
        </div>
      )
      rigthSideNavOptions = (
        <div className={styles.navOptions}>
          <Link to="/login" id={styles.logout_btn} onClick={logout} >
            Sair
          </Link>
          
        </div>
      )
    }
    if (isPadariaUser(user)) {

      rigthSideNavOptions = (
        <div className={styles.navOptions}>
          <Link to="/new-subscription-plan" id={styles.logout_btn}  >
            Nova Plano
          </Link>
          <Link to="/login" id={styles.logout_btn} onClick={logout} >
            Sair
          </Link>
          
        </div>
      )
    }
  }
  else{
    leftSideNavOptions = (
      <div className={styles.defaultNavOptions}>
        <Link to="/"   className={styles.option} >
          Início
        </Link>
      </div>
    )
    rigthSideNavOptions = (
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
    {leftSideNavOptions}

    <div className={styles.logoContainer}>
      <img src={Logo} className={styles.logo} alt="logo padaflix"/>
    </div>

    
    {rigthSideNavOptions}
  </nav>;
  
}
 
export default NavBar;