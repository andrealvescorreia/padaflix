import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterBakeryForm from "../../components/RegisterBakeryForm";
import { Endereco } from "../../types/Endereco";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";


const RegisterBakery = () => {
    interface PadariaRegisterData {
        nome_fantasia: string,
        email: string,
        password: string,
        cnpj: string,
        telefone: string,
        endereco: Endereco
    }
      
    interface PadariaRegisterStepOne {
        nome_fantasia: string,
        email: string,
        password: string,
        cnpj: string,
        telefone: string,
    }


    const defaultPadaria : PadariaRegisterData = {
        nome_fantasia: '',
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
        cnpj: '',
        telefone: '',
    }

    const [padariaRegisterData, setPadariaRegisterData] = useState<PadariaRegisterData>(defaultPadaria)
    const [currentRegisterStep, setCurrentRegisterStep] = useState(1)


    const navigate = useNavigate()
    const registerPadaria = async (padaria: PadariaRegisterData) => {
        axiosInstance.post('/register_padaria', padaria)
        .then(() => {
            alert('Registrada com sucesso!')
            navigate('/login')
        })
        .catch((err) => {
            if(!err.response) alert('Servidor do padaflix está fora do ar!')
            else{
                alert('deu ruim, dê uma olhada no console pra tentar se salvar')
                console.log(err.response.data)
            }
        })
    }
    
    function goToNextRegisterStep(newUserData : PadariaRegisterStepOne){
        setPadariaRegisterData(prevUserRegisterData => ( {...prevUserRegisterData, ...newUserData} ));
        setCurrentRegisterStep(2)
    }

    function goToPreviousRegisterStep(padariaEndereco: Endereco){
        setPadariaRegisterData(prevUserRegisterData => ( {...prevUserRegisterData, endereco: padariaEndereco} ));
        setCurrentRegisterStep(1)
    }
    
    function finishRegister(padariaEndereco: Endereco){
        setPadariaRegisterData(prevUserRegisterData => ( {...prevUserRegisterData, endereco: padariaEndereco} ));
        registerPadaria( {...padariaRegisterData, endereco: padariaEndereco} as PadariaRegisterData )
    }

    switch(currentRegisterStep) {
        case 1:
            return(
                <RegisterBakeryForm 
                onSubmit={goToNextRegisterStep} 
                defaultData={padariaRegisterData}/>
            )
        case 2:
            return(
                <AddressForm 
                onSubmit={finishRegister} 
                onGoBack={goToPreviousRegisterStep} 
                defaultData={padariaRegisterData.endereco}/>
            )
    }
}
 
export default RegisterBakery;