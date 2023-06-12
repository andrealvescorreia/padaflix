import { useState } from "react";
import axiosInstance from "../../axios";
import LoginForm from "../../components/LoginForm";
import { useSnackbar } from 'notistack';
import { LinearProgress } from "@mui/material";

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
                enqueueSnackbar("Ocorreu um erro no registro: "+JSON.stringify(err.response.data), { variant: 'error'})
                console.log(err.response.data)
            }
        })
        .finally(()=>{
            setIsFetching(false)
        })
    }

    return <>
        { isFetching ? <LinearProgress /> : null}
        <LoginForm onSubmit={login} disabled={isFetching}/>;
    </>

}

export default Login;