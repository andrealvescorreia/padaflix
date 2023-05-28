import { PadariaUser, User, isPadariaUser, isUser } from "../../types/User";
import HomeNotLoggedIn from "../HomeNotLoggedIn";
import HomePadaria from "../routesPadaria/HomePadaria";
import PadariasList from "../PadariasList";


function NotLoggedInHome(){
  return <HomeNotLoggedIn/>
}
function UserHome(user: User) {
  return <div>
    Olá {user.name}
    <PadariasList user={user}/>
  </div>;
}

interface HomeProps {
  user: User | undefined | PadariaUser
}

const Home = ({user} : HomeProps) => {
  if (user) {
    if (isUser(user)) return UserHome(user)
    if (isPadariaUser(user)) return <HomePadaria/>
  }
  
  return NotLoggedInHome()
}
 
export default Home;