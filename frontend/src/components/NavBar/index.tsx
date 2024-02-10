import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo.png';
import Logout from "@mui/icons-material/Logout";
import { PadariaUser, User, isUser } from "../../types/User";

interface NavBarProps {
  user: User | undefined | PadariaUser
  logout: () => void;
}

const NavBar = ({ user, logout }: NavBarProps) => {

  const isThisPath = (text: string) => {
    return document.URL.match(text)
  }

  const notLoggedInRightOptions = (
    <span className={styles.rightOptions}>
      <Link to="/login" id={styles.login_btn} className={styles.btn} >
        Login
      </Link>
      <Link to="/choose-profile" id={styles.start_now_btn} className={styles.btn} >
        Comece Agora
      </Link>
    </span>
  )

  const defaultCenterOptions = (
    <Link to="/padarias" id={isThisPath("/padarias") ? styles.selected_btn : styles.nav_btn}>
      Padarias
    </Link>
  )

  const userRightOptions = (
    <span className={styles.rightOptions} >
      <a id={styles.login_btn} className={styles.btn} onClick={logout} >
        <Logout /> Sair
      </a>
    </span>
  )

  const userCenterOptions = (
    <>
      <Link to="/inicio" id={isThisPath("/inicio") ? styles.selected_btn : styles.nav_btn}>
        Minhas assinaturas
      </Link>
      <Link to="/padarias" id={isThisPath("/padarias") ? styles.selected_btn : styles.nav_btn}>
        Padarias
      </Link>
    </>
  )

  let centerSideNavOptions;
  let rigthSideNavOptions;


  if (isUser(user)) {
    rigthSideNavOptions = userRightOptions
    centerSideNavOptions = userCenterOptions
  }
  else {
    rigthSideNavOptions = notLoggedInRightOptions
    centerSideNavOptions = defaultCenterOptions
  }

  let hideNavigation = isThisPath("/register") || isThisPath("/login") || isThisPath("/choose-profile")

  return <nav id={hideNavigation ? styles.cleanNavbar : styles.navbar}>
    <Link className={styles.logoContainer} to="/inicio">
      <img src={Logo} className={styles.logo} alt="logo padaflix" />
    </Link>

    {
      hideNavigation
        ?
        <></>
        :
        <>
          <div className={styles.centerNavOptions}>
            {centerSideNavOptions}
          </div>
          {rigthSideNavOptions}
        </>
    }

  </nav>;
}

export default NavBar;