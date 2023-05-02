import { SyntheticEvent, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axiosInstance from '../../axios'
import { Navigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import InputAdornments from "../../components/InputPass";

const RegisterBekery = () => {

    const [nome_fantasia, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();//previne de recarregar a pagina ao clicar em submit

        axiosInstance.post('/register_padaria', {
            nome_fantasia,
            cnpj,
            telefone, 
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
        <main id = "mainContainer">
        
        <form onSubmit={submit} id = "secondaryContainer">
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
                    <InputAdornments onChange={e => setPassword(e.target.value)} />
                </label>
                <div id="buttonsOfLogin">
                    <Button variant="contained" className="buttonFull" type="submit">Registro</Button>
                </div>
        </form>
        </main>
    );
}
 
export default RegisterBekery;