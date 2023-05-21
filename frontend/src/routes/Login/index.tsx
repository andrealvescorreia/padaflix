import axiosInstance from "../../axios";
import LoginForm from "../../components/LoginForm";

interface LoginProps {
    onSuccessfulLogin: () => void;
}

const Login = ({ onSuccessfulLogin }: LoginProps) => {
    const login = async (email: string, password: string) => {
        axiosInstance.post('/login', {
            email,
            password
        })
        .then(async () => {
            onSuccessfulLogin()
        })
        .catch((err) => {
            alert(err)
        })
    }

    return <LoginForm onSubmit={login}/>;
}

export default Login;