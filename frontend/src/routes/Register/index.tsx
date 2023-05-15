import { SyntheticEvent, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axiosInstance from '../../axios'
import { Navigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import InputAdornments from "../../components/InputPass";
import EmailInput from "../../components/EmailInput";
import InputPassRegister from "../../components/InputPassRegister";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();//previne de recarregar a pagina ao clicar em submit

        axiosInstance.post('/register_user', {
            name,
            email, 
            password
        })
        .then((response) => {
            alert(JSON.stringify(response.data))
            navigate('/login')
        })
        .catch((err) => {
            alert(err)
        })
    }

    return ( 
        <main  id="mainContainer">
        <form  onSubmit={submit} id = "secondaryContainer">

                <label htmlFor="name">Nome
                    <TextField id="name"onChange={e => setName(e.target.value)}/>
                </label>

                <label htmlFor="">E-mail
                    <EmailInput onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="">Senha
                    <InputPassRegister onChange={e => setPassword(e.target.value)} />
                </label>

                <div id="buttonsOfLogin">
                    <Button variant="contained" className="buttonFull" type="submit">Criar conta</Button>
                </div>
                
            </form>
        </main>
    );
}
 
export default Register;