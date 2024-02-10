import { useState } from "react";
import axiosInstance from "../../axios";
import LoginForm from "../../components/LoginForm";
import { useSnackbar } from 'notistack';
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.scss";

interface LoginProps {
    onSuccessfulLogin: () => void;
}

const Login = ({ onSuccessfulLogin }: LoginProps) => {
    const [isFetching, setIsFetching] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const login = async (email: string, password: string) => {
        setIsFetching(true)
        axiosInstance.post('/login', {
            email,
            password
        })
        .then(async () => {
            onSuccessfulLogin()
        })
        .catch((err) => {
            if(!err.response) {
                enqueueSnackbar('Servidor do padaflix fora do ar', { variant: 'error'})
            }
            else{
                enqueueSnackbar("Não foi possível realizar o login",{ variant: 'error'})
                console.log(err.response.data)
            }
        })
        .finally(()=>{
            setIsFetching(false)
        })
    }

    return <div id='login-page'>
        { isFetching ? <LinearProgress /> : null}
        <LoginForm onSubmit={login} disabled={isFetching}/>
        <p>Não tem uma conta? <Link to ='/choose-profile'>Registro</Link></p>
    </div>

}

export default Login;