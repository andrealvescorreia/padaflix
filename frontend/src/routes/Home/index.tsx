import { PadariaUser, User, isPadariaUser, isUser } from "../../types/User";
import HomeNotLoggedIn from "../HomeNotLoggedIn";
import HomePadaria from "../routesPadaria/HomePadaria";
import PadariasList from "../PadariasList";
import UserDashboard from "../UserDashboard";


function NotLoggedInHome(){
  return <HomeNotLoggedIn/>
}


interface HomeProps {
  user: User | undefined | PadariaUser
}

const Home = ({user} : HomeProps) => {
  if (user) {
    if (isUser(user)) return <UserDashboard user={user}/>
    if (isPadariaUser(user)) return <HomePadaria/>
  }
  
  return NotLoggedInHome()
}
 
export default Home;