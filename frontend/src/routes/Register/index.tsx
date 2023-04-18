import { SyntheticEvent, useState } from "react";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
      
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })

        const content = await response.json();

        alert(JSON.stringify(content))
    }

    return ( 
        <main className="form-signin w-100 m-auto">
        
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Registro</h1>
            <div className="form-floating">
                <input className="form-control"  placeholder="Nome" required
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Nome</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control"  placeholder="name@example.com"
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
            <button className="w-100 btn btn-lg btn-primary" type="submit">Registrar</button>
        </form>
        </main>
    );
}
 
export default Register;