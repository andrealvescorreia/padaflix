import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import InputPassRegister from "../InputPassRegister";
import InputMask from 'react-input-mask';

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
                    <TextField 
                    required
                    onChange={e => setName(e.target.value)}/>
                </label>

                <InputMask 
                    mask="99.999.999/9999-99"  
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                >
                    <label htmlFor="">CNPJ
                        <TextField required/>
                    </label>
                </InputMask>

                <label htmlFor="">E-mail
                    <TextField
                    required
                    onChange={e => setEmail(e.target.value)}/>
                </label>

                <InputMask 
                    mask="(99) 9 9999-9999"  
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                >
                    <label htmlFor="">Telefone
                        <TextField required/>
                    </label>
                </InputMask>

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