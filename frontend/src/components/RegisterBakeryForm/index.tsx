import { SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import InputPassRegister from "../InputPassRegister";
import InputMask from 'react-input-mask';

interface PadariaRegister {
    nome_fantasia: string,
    email: string,
    password: string,
    cnpj: string,
    telefone: string,
}

interface RegisterProps {
    onSubmit: (padaria: PadariaRegister) => void;
    defaultData: PadariaRegister
}


const RegisterBekery = (props: RegisterProps) => {
    const { onSubmit, defaultData } = props

    const [nome_fantasia, setName] = useState(defaultData.nome_fantasia);
    const [email, setEmail] = useState(defaultData.email);
    const [cnpj, setCnpj] = useState(defaultData.cnpj);
    const [telefone, setTelefone] = useState(defaultData.telefone);
    const [password, setPassword] = useState(defaultData.password);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSubmit({nome_fantasia, email, password, cnpj, telefone} as PadariaRegister);
    }

    return ( 
        <main id = "mainContainer">
            <form onSubmit={handleSubmit} id = "secondaryContainer">
            
                <label htmlFor="">Nome fantasia
                    <TextField 
                    value = {nome_fantasia}
                    required
                    onChange={e => setName(e.target.value)}/>
                </label>

                <InputMask 
                    mask="99.999.999/9999-99"  
                    onChange={e => setCnpj(e.target.value)}
                >
                    <label htmlFor="">CNPJ
                        <TextField value={cnpj} required/>
                    </label>
                </InputMask>

                <label htmlFor="">E-mail
                    <TextField
                    value = {email}
                    required
                    onChange={e => setEmail(e.target.value)}/>
                </label>

                <InputMask 
                    mask="(99) 9 9999-9999"  
                    onChange={e => setTelefone(e.target.value)}
                >
                    <label htmlFor="">Telefone
                        <TextField value={telefone} required/>
                    </label>
                </InputMask>

                <label htmlFor="">Senha
                    <InputPassRegister 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                </label>
                <div id="buttonsOfLogin">
                    <Button variant="contained" className="buttonFull" type="submit">Continuar</Button>
                </div>
            </form>
        </main>
    );
}
 
export default RegisterBekery;