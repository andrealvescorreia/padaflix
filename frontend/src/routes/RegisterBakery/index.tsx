import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterBakeryForm from "../../components/RegisterBakeryForm";
import { Endereco } from "../../types/Endereco";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";



const RegisterBakery = () => {

    const [currentRegisterStep, setCurrentRegisterStep] = useState(1)
    const [nome_fantasia, setNome_fantasia] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate()
    const registerBakery = async (nome_fantasia: string, email: string, password: string, cnpj: string, telefone: string, padariaEndereco: Endereco) => {
        axiosInstance.post('/register_padaria', {
            nome_fantasia,
            cnpj,
            telefone, 
            endereco: padariaEndereco,
            email,
            password
        })
        .then(() => {
            alert('Registrado com sucesso!')
            navigate('/login')
        })
        .catch((err) => {
            alert('deu ruim, olhe o console')
            console.log(err.response.data)
        })
    }
    
    function goToNextRegisterStep(padariaNomeFantasia: string, padariaEmail: string, padariaPassword: string, padariaCnpj: string, padariaTelefone: string){
        setNome_fantasia(padariaNomeFantasia)
        setEmail(padariaEmail)
        setPassword(padariaPassword)
        setCnpj(padariaCnpj)
        setTelefone(padariaTelefone)
    
        setCurrentRegisterStep(2)
    }
    
    function goToPreviousRegisterStep(){
        setCurrentRegisterStep(1)
    }
    
    function finishRegister(padariaEndereco: Endereco){
        registerBakery(nome_fantasia, email, password, cnpj, telefone, padariaEndereco)
    }



    if(currentRegisterStep == 1){
        return <RegisterBakeryForm onSubmit={goToNextRegisterStep}/>
    }
    else {
        return <AddressForm onSubmit={finishRegister} onGoBack={goToPreviousRegisterStep}/>
    }
}
 
export default RegisterBakery;