import { User } from "../../types/User";

interface HomeProps {
  user: User | undefined
}

const Home = ({user} : HomeProps) => {
  return (
    <div>
      {
        user 
        ? 
        'Bem vindo ' + user.name 
        : 
        'Voce não está logado...'
      }
    </div>
  );
}
 
export default Home;