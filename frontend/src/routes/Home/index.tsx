import {useEffect, useState} from "react";
import axiosInstance from '../../axios'

const Home = () => {

  const [name, setName] = useState('')

  useEffect(() => {
  (
    async () => {
      axiosInstance.get('/user')
      .then((response) => {
        setName(response.data.name);
      })
      .catch(() => {
        console.log('não autorizado...')
      })
    }
  )();
  })

  return ( 
    <div>
      {name ? 'Bem vindo ' + name : 'Voce não está logado...' }
    </div>
  );
}
 
export default Home;