import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo.png';
import { PadariaUser, User, isPadariaUser, isUser } from "../../types/User";

interface NavBarProps {
  user: User | undefined | PadariaUser
  logout: () => void;
}

const NavBar = ( {user, logout} : NavBarProps ) => {

  const notLoggedInOptions = (
    <>
      <Link to="/login"  id={styles.login_btn} className={styles.btn} >
        Login
      </Link>
      <Link to="/choose-profile" id={styles.start_now_btn} className={styles.btn} >
        Começe Agora
      </Link>
    </>
  )

  const userOptions = (
    <>
      <Link to="/login" id={styles.logout_btn} onClick={logout} >
        Sair
      </Link>
    </>
  )

  

  const padariaOptions = (
    <>
      <Link to="/new-subscription-plan" id={styles.logout_btn}  >
        Nova Plano
      </Link>
      {userOptions}
    </>
  )

  let rigthSideNavOptions;

  if (user) {
    if(isUser(user)){
      rigthSideNavOptions = userOptions
    }
    if (isPadariaUser(user)) {
      rigthSideNavOptions = padariaOptions
    }
  }
  else {
    rigthSideNavOptions = notLoggedInOptions
  }

  
  
  return <nav id={styles.navbar}>
    <div className={styles.defaultNavOptions}>
      <Link to="/"   className={styles.option} >
        Início
      </Link>
    </div>

    <div className={styles.logoContainer}>
      <img src={Logo} className={styles.logo} alt="logo padaflix"/>
    </div>

    <div className={styles.navOptions}>
      {rigthSideNavOptions}
    </div>
  </nav>;
}
 
export default NavBar;