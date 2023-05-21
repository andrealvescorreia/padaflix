import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import EmailInput from "../EmailInput";
import InputPassRegister from "../InputPassRegister";

interface RegisterProps {
    onSubmit: (name: string, email: string, password: string) => void;
}


const RegisterUserForm = (props: RegisterProps) => {
    const { onSubmit } = props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (value: string, isValid: boolean) => {
        setEmail(value);
        setIsEmailValid(isValid);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSubmit(name, email, password);
    }


    return (<main id="mainContainer">
        <form onSubmit={handleSubmit} id="secondaryContainer">

            <label htmlFor="name">Nome
                <TextField 
                id="name" 
                required
                onChange={e => setName(e.target.value)} />
            </label>

            <label htmlFor="">E-mail
                <EmailInput onChange={handleEmailChange} />
            </label>

            <label htmlFor="">Senha
                <InputPassRegister onChange={e => setPassword(e.target.value)} />
            </label>

            <div id="buttonsOfLogin">
                <Button variant="contained" className="buttonFull" type="submit">Continuar</Button>
            </div>

        </form>
    </main>
    );
}


export default RegisterUserForm;