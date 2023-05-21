import { SyntheticEvent, useState } from "react";
import InputAdornments from "../InputPass";
import { Button, TextField } from "@mui/material";
import "./Login.scss";
import InputPass from "../InputPass";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm = (props: LoginFormProps) => {

    const { onSubmit } = props

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSubmit(email, password);
    }

    return (
        <main id="mainContainer">

            <form onSubmit={handleSubmit} id="secondaryContainer">

                <label htmlFor="">E-mail
                    <TextField onChange={e => setEmail(e.target.value)} />
                </label>

                <label htmlFor="">Senha
                    <InputPass onChange={e => setPassword(e.target.value)} />
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

export default LoginForm;