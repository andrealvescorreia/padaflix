import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import EmailInput from "../EmailInput";
import InputPassRegister from "../InputPassRegister";


interface UserRegister {
    nome: string,
    email: string,
    password: string
}

interface RegisterProps {
    onSubmit: (user: UserRegister) => void,
    defaultData: UserRegister
}


const RegisterUserForm = (props: RegisterProps) => {
    const { onSubmit, defaultData } = props
    const [nome, setNome] = useState(defaultData.nome);
    const [email, setEmail] = useState(defaultData.email);
    const [password, setPassword] = useState(defaultData.password);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (value: string, isValid: boolean) => {
        setEmail(value);
        setIsEmailValid(isValid);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const user : UserRegister = {
            nome,
            email,
            password,
        }
        onSubmit(user);
    }


    return (<main id="mainContainer">
        <form onSubmit={handleSubmit} id="secondaryContainer">

            <label htmlFor="name">Nome
                <TextField 
                value={nome}
                id="name" 
                required
                onChange={e => setNome(e.target.value)} />
            </label>

            <label htmlFor="">E-mail
                <EmailInput onChange={handleEmailChange} value={email} />
            </label>

            <label htmlFor="">Senha
                <InputPassRegister onChange={e => setPassword(e.target.value)} value={password} />
            </label>

            <div id="buttonsOfLogin">
                <Button variant="contained" className="buttonFull" type="submit">Continuar</Button>
            </div>

        </form>
    </main>
    );
}


export default RegisterUserForm;