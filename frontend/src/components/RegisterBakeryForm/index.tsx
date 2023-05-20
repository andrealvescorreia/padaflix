import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import InputPassRegister from "../InputPassRegister";

interface RegisterProps {
    onSubmit: (nome_fantasia: string, email: string, password: string, cnpj: string, telefone: string) => void;
}


const RegisterBekery = (props: RegisterProps) => {
    const { onSubmit } = props

    const [nome_fantasia, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSubmit(nome_fantasia, email, password, cnpj, telefone);
    }

    return ( 
        <main id = "mainContainer">
        
        <form onSubmit={handleSubmit} id = "secondaryContainer">
                <label htmlFor="">Nome fantasia
                    <TextField onChange={e => setName(e.target.value)}/>
                </label>

                <label htmlFor="">CNPJ
                    <TextField onChange={e => setCnpj(e.target.value)}/>
                </label>

                <label htmlFor="">E-mail
                    <TextField onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="">Telefone
                    <TextField onChange={e => setTelefone(e.target.value)} />
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
 
export default RegisterBekery;