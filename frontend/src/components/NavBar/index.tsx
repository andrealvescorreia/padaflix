import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo.png';
import { PadariaUser, User, isPadariaUser, isUser } from "../../types/User";

interface NavBarProps {
  user: User | undefined | PadariaUser
  logout: () => void;
}

const NavBar = ( {user, logout} : NavBarProps ) => {

  const notLoggedInRightOptions = (
    <>
      <Link to="/login"  id={styles.login_btn} className={styles.btn} >
        Login
      </Link>
      <Link to="/choose-profile" id={styles.start_now_btn} className={styles.btn} >
        Comece Agora
      </Link>
    </>
  )

  const userRightOptions = (
    <>
      <Link to="/login" id={styles.logout_btn} onClick={logout} >
        Sair
      </Link>
    </>
  )
  
  const defaultLeftOptions = (
    <Link to="/inicio" id={styles.logout_btn}>
      Início
    </Link>
  )

  const userSubscriberLeftOptions = (
    <>
      <Link to="/inicio" id={styles.logout_btn}>
        Início
      </Link>
      <Link to="/padarias" id={styles.logout_btn}>
        Padarias
      </Link>
    </>
  )

  let leftSideNavOptions;
  let rigthSideNavOptions;

  
  if(isUser(user)){
    rigthSideNavOptions = userRightOptions
    leftSideNavOptions = userSubscriberLeftOptions
  }
  else {
    rigthSideNavOptions = notLoggedInRightOptions
    leftSideNavOptions = defaultLeftOptions
  }

  
  
  return <nav id={styles.navbar}>
    <div className={styles.leftNavOptions}>
      { leftSideNavOptions }
    </div>

    <div className={styles.logoContainer}>
      <img src={Logo} className={styles.logo} alt="logo padaflix"/>
    </div>

    <div className={styles.navOptions}>
      { rigthSideNavOptions }
    </div>
  </nav>;
}
 
export default NavBar;