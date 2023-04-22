import { SyntheticEvent, useState } from "react";
import axiosInstance from '../../axios'
import { useNavigate } from "react-router-dom";

const Login = (props : {setName: (name: string) => void }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        axiosInstance.post('/login', {
            email, 
            password
        })
        .then((response) => {
            props.setName(response.data.name)
            navigate('/')
        })
        .catch((err) => {
            alert(err)
        })
    }


    return (
        <main className="form-signin w-100 m-auto">
        
        <form  onSubmit={submit} >
            <h1 className="h3 mb-3 fw-normal">Por favor, realize o Login</h1>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Senha</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
        </form>
        </main>
    );
}
 
export default Login;