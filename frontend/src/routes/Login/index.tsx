import { SyntheticEvent, useState } from "react";
import InputAdornments from "../../components/InputPass";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axios'
import { User } from "../../types/User";
import "./Login.scss";

interface LoginProps {
    setUser: (user: User | undefined) => void
}

const Login = ( {setUser}: LoginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        axiosInstance.post('/login', {
            email, 
            password
        })
        .then((response) => {
            setUser(response.data)
            navigate('/') // redireciona para a homepage
        })
        .catch((err) => {
            alert(err)
        })
    }


    return (
        <main id = "mainContainer">
        
            <form  onSubmit={submit} id = "secondaryContainer">
                <img src = 'src\routes\Login\img\logo1.png'  alt="logo" />

                <label htmlFor="">E-mail
                    <TextField onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="">Senha
                    <InputAdornments onChange={e => setPassword(e.target.value)} />
                </label>
                <div id="buttonsOfLogin">
                    <Button variant="contained" className="buttonFull" type="submit">Login</Button>
                    <Button variant="outlined" className="buttonEmpty">Cadastrar-se</Button>
                    <Button variant="text" className="buttonText">Esqueci a senha!</Button>
                </div>
                
            </form>
        </main>
    );
}
 
export default Login;