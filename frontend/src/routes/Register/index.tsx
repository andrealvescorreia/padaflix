import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import EmailInput from "../../components/EmailInput";
import InputPassRegister from "../../components/InputPassRegister";

interface RegisterProps {
    onSubmit: (name: string, email: string, password: string) => void;
}


const Register = (props:RegisterProps) => {
    const { onSubmit } = props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (value: string, isValid: boolean) => {
    setEmailValue(value);
    setIsEmailValid(isValid);
    };

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
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSubmit(name, email, password);
    }

    return ( 
        <main  id="mainContainer">
        <form  onSubmit={handleSubmit} id = "secondaryContainer">

                <label htmlFor="name">Nome
                    <TextField id="name"onChange={e => setName(e.target.value)}/>
                </label>

                <label htmlFor="">E-mail
                    <EmailInput onChange={handleEmailChange}/>
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