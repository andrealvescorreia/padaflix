import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterBakeryForm from "../../components/RegisterBakeryForm";
import { Endereco } from "../../types/Endereco";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";
import LinearProgress from '@mui/material/LinearProgress';
import { useSnackbar } from 'notistack';


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
    const [isFetching, setIsFetching] = useState(false)

    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const registerPadaria = async (padaria: PadariaRegisterData) => {
        
        setIsFetching(true)

        axiosInstance.post('/register_padaria', padaria)
        .then(() => {
            enqueueSnackbar("Registrado com sucesso! Realize o login", { variant: 'success'})
            navigate('/login')
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
                    defaultData={padariaRegisterData}
                />
            )
        case 2:
            return(
                <>
                    { isFetching ? <LinearProgress /> : null}
                    <AddressForm 
                        onSubmit={finishRegister} 
                        onGoBack={goToPreviousRegisterStep} 
                        defaultData={padariaRegisterData.endereco}
                        disabled={isFetching}
                    />
                </>
            )
    }
}
 
export default RegisterBakery;