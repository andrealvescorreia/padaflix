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
    <>
      <Link to="/login" id={styles.login_btn} className={styles.btn} >
        Login
      </Link>
      <Link to="/choose-profile" id={styles.start_now_btn} className={styles.btn} >
        Comece Agora
      </Link>
    </>
  )

  const defaultCenterOptions = (
    <Link to="/padarias" id={isThisPath("/padarias") ? styles.selected_btn : styles.nav_btn}>
      Padarias
    </Link>
  )

  const userRightOptions = (
    <>
      <Link to="/login" id={styles.login_btn} className={styles.btn} onClick={logout} >
        <Logout /> Sair
      </Link>
    </>
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

  let hideNavigation = isThisPath("/register") || isThisPath("/login")

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

          <div className={styles.navOptions}>
            {rigthSideNavOptions}
          </div>
        </>
    }

  </nav>;
}

export default NavBar;