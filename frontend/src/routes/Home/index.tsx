import {useEffect, useState} from "react";

const Home = () => {

    const [name, setName] = useState('')

    useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })
        const content = await response.json();
        setName(content.name);
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