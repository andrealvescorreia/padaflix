import { PadariaUser, User, isPadariaUser, isUser } from "../../types/User";
import HomeNotLoggedIn from "../HomeNotLoggedIn";
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
function PadariaUserHome(padariaUser: PadariaUser) {
  return <div>
    Olá {padariaUser.nome_fantasia}
  </div>;
}


interface HomeProps {
  user: User | undefined | PadariaUser
}

const Home = ({user} : HomeProps) => {
  if (user) {
    if (isUser(user)) return UserHome(user)
    if (isPadariaUser(user)) return PadariaUserHome(user)
  }
  
  return NotLoggedInHome()
}
 
export default Home;