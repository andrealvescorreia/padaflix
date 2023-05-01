import { SyntheticEvent, useState } from "react";
import InputAdornments from "../../components/InputPass";
import { Button, TextField } from "@mui/material";
import "./Login.scss";
import logo from ".\img\logo1.png";
// CRIANDO TEMA PARA OS BOTÕES

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        })
        const content = await response.json();

        alert(JSON.stringify(content))
    }


    return (
        <main id = "mainContainer">
        
            <form  onSubmit={submit} id = "secondaryContainer">
                <img src = 'src\routes\Login\img\logo1.png'  alt="logo" />

                <label htmlFor="">E-mail
                    <TextField/>
                </label>

                <label htmlFor="">Senha
                    <InputAdornments/>
                </label>
                <div id="buttonsOfLogin">
                    <Button variant="contained" className="buttonFull">Login</Button>
                    <Button variant="outlined" className="buttonEmpty">Cadastrar-se</Button>
                    <Button variant="text" className="buttonText">Esqueci a senha!</Button>
                </div>
                
            </form>
        </main>
    );
}
 
export default Login;