import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterUserForm from "../../components/RegisterUserForm";
import { Endereco } from "../../types/Endereco";
import { useState, useEffect } from "react";
import AddressForm from "../../components/AddressForm";


const RegisterUser = () => {
    
    const [currentRegisterStep, setCurrentRegisterStep] = useState(1)

    interface UserRegisterStep1 {
        name: string,
        email: string,
        password: string,
    }
    
    interface UserRegister{
        name: string,
        endereco: Endereco,
        email: string,
        password: string,
    }

    const defaultUser : UserRegister = {
        name: '',
        endereco: {
            cep: '', 
            rua: '', 
            numero: '', 
            complemento: '', 
            bairro: '', 
            cidade: '', 
            uf: ''
        },
        email: '',
        password: '',
    }

    const [userRegisterData, setUserRegisterData] = useState<UserRegister>(defaultUser)

    const navigate = useNavigate()
    const registerUser = async (user: UserRegister) => {
        axiosInstance.post('/register_user', user)
        .then(() => {
            alert('Registrado com sucesso!')
            navigate('/login')
        })
        .catch((err) => {
            if(!err.response) alert('Servidor fora do ar!')
            else{
                alert('deu ruim, dê uma olhada no console pra tentar se salvar')
                console.log(err.response.data)
            }
        })
    }
    
    function goToNextRegisterStep(newUserData : UserRegisterStep1){
        setUserRegisterData(prevUserRegisterData => ({...prevUserRegisterData, ...newUserData}));
        setCurrentRegisterStep(2)
    }
    

    function goToPreviousRegisterStep(userEndereco: Endereco){
        setUserRegisterData(prevUserRegisterData => (
            {
                ...prevUserRegisterData, 
                endereco: userEndereco
            }
        ));
        setCurrentRegisterStep(1)
    }
    
    function finishRegister(userEndereco: Endereco){
 
        setUserRegisterData(prevUserRegisterData => (
            {
                ...prevUserRegisterData, 
                endereco: userEndereco
            }
        ))

        registerUser({
            ...userRegisterData, 
            endereco: userEndereco
        } as UserRegister)
    }



    if(currentRegisterStep == 1){
        return <RegisterUserForm onSubmit={goToNextRegisterStep} defaultData={userRegisterData}/>
    }
    else {
        return <AddressForm onSubmit={finishRegister} onGoBack={goToPreviousRegisterStep} defaultData={userRegisterData.endereco}/>
    }
}
 
export default RegisterUser;