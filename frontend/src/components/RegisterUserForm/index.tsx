import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import EmailInput from "../EmailInput";
import InputPassRegister from "../InputPassRegister";
import { useSnackbar } from "notistack";

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
    const { enqueueSnackbar } = useSnackbar();

    const handleEmailChange = (value: string, isValid: boolean) => {
        setEmail(value);
        setIsEmailValid(isValid);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
      
        if (!isEmailValid) {
          enqueueSnackbar("O e-mail inserido é inválido.", { variant: "error" });
          return;
        } else if (password.length < 8) {
          enqueueSnackbar("Senha menor que 8 dígitos.", { variant: "error" });
          return;
        } else if (!hasUppercaseAndNumber(password)) {
          enqueueSnackbar(
            "A senha deve conter no mínimo 1 letra maiúscula e 1 número!",
            { variant: "error" }
          );
          return;
        }
      
        const user: UserRegister = {
          nome,
          email,
          password,
        };
        onSubmit(user);
      };
      
      const hasUppercaseAndNumber = (value: string): boolean => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUppercase && hasNumber;
      };
      


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
                <EmailInput onChange={handleEmailChange} value={email}  />
            </label>

            <label htmlFor="">Senha
                <InputPassRegister onChange={e => setPassword(e.target.value)} value={password} />
            </label>

            <div id="buttonsOfLogin">
                <Button variant="contained" className="buttonFull" type="submit">Continuar</Button>
            </div>
            {/* {console.log("é vallido",isEmailValid)} */}
        </form>
    </main>
    );
}


export default RegisterUserForm;