import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterUserForm from "../../components/RegisterUserForm";
import { Endereco } from "../../types/Endereco";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";


const RegisterUser = () => {
    
    interface UserRegisterStepOne {
        name: string,
        email: string,
        password: string,
    }
    
    interface UserRegisterData {
        name: string,
        email: string,
        password: string,
        endereco: Endereco,
    }

    const templateUser : UserRegisterData = {
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

    const [userRegisterData, setUserRegisterData] = useState<UserRegisterData>(templateUser)
    const [currentRegisterStep, setCurrentRegisterStep] = useState(1)
    const [isFetching, setIsFetching] = useState(false)

    const navigate = useNavigate()
    const registerUser = async (user: UserRegisterData) => {
        setIsFetching(true)
        axiosInstance.post('/register_user', user)
        .then(() => {
            alert('Registrado com sucesso!')
            navigate('/login')
        })
        .catch((err) => {
            if(!err.response) alert('Servidor do padaflix está fora do ar!')
            else{
                alert('deu ruim, dê uma olhada no console pra tentar se salvar')
                console.log(err.response.data)
            }
        })
        .finally(()=>{
            setIsFetching(false)
        })
    }
    
    function goToNextRegisterStep(newUserData : UserRegisterStepOne){
        setUserRegisterData(prevUserRegisterData => ( {...prevUserRegisterData, ...newUserData} ));
        setCurrentRegisterStep(2)
    }

    function goToPreviousRegisterStep(userEndereco: Endereco){
        setUserRegisterData(prevUserRegisterData => ( {...prevUserRegisterData, endereco: userEndereco} ));
        setCurrentRegisterStep(1)
    }
    
    function finishRegister(userEndereco: Endereco){
        setUserRegisterData(prevUserRegisterData => ( {...prevUserRegisterData, endereco: userEndereco} ));
        registerUser( {...userRegisterData, endereco: userEndereco} as UserRegisterData )
    }

    switch(currentRegisterStep) {
        case 1:
            return(
                <RegisterUserForm 
                    onSubmit={goToNextRegisterStep} 
                    defaultData={userRegisterData}
                />
            )
        case 2:
            return(
                <AddressForm 
                    onSubmit={finishRegister} 
                    onGoBack={goToPreviousRegisterStep} 
                    defaultData={userRegisterData.endereco}
                    disabled={isFetching}
                />
            )
    }
}
 
export default RegisterUser;