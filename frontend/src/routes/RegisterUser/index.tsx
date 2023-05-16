import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterUserForm from "../../components/RegisterUserForm";
import { Endereco } from "../../types/Endereco";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";


const RegisterUser = () => {
    
    const [currentRegisterStep, setCurrentRegisterStep] = useState(1)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate()
    const registerUser = async (name: string, email: string, password: string, userEndereco: Endereco) => {
        axiosInstance.post('/register_user', {
            name,
            endereco: userEndereco,
            email,
            password,
        })
        .then(() => {
            alert('Registrado com sucesso!')
            navigate('/login')
        })
        .catch((err) => {
            alert('deu ruim, dê uma olhada no console pra tentar se salvar')
            console.log(err)
        })
    }
    
    function goToNextRegisterStep(userName: string, userEmail: string, userPassword: string){
        setName(userName)
        setEmail(userEmail)
        setPassword(userPassword)
    
        setCurrentRegisterStep(2)
    }
    
    function goToPreviousRegisterStep(){
        setCurrentRegisterStep(1)
    }
    
    function finishRegister(userEndereco: Endereco){
        registerUser(name, email, password, userEndereco)
    }



    if(currentRegisterStep == 1){
        return <RegisterUserForm onSubmit={goToNextRegisterStep}/>
    }
    else {
        return <AddressForm onSubmit={finishRegister} onGoBack={goToPreviousRegisterStep}/>
    }
}
 
export default RegisterUser;