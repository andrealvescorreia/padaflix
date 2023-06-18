import { SyntheticEvent, useState } from "react";
import InputAdornments from "../InputPass";
import { Button, TextField } from "@mui/material";
import "./Login.scss";
import InputPass from "../InputPass";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void,
    disabled: boolean,
}

const LoginForm = (props: LoginFormProps) => {

    const { onSubmit, disabled } = props

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
                    <TextField onChange={e => setEmail(e.target.value)} disabled={disabled}/>
                </label>

                <label htmlFor="">Senha
                    <InputPass onChange={e => setPassword(e.target.value)}  disabled={disabled}/>
                </label>
                <div id="buttonsOfLogin">
                    <Button variant="contained" className="buttonFull" type="submit"  disabled={disabled} >Login</Button>
                    <Button variant="outlined" className="buttonEmpty" disabled={disabled} >Criar conta</Button>
                </div>

            </form>
        </main>
    );
}

export default LoginForm;