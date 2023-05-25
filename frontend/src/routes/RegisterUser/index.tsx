import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import RegisterUserForm from "../../components/RegisterUserForm";
import { Endereco } from "../../types/Endereco";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";
import { AlertColor } from '@mui/material/Alert';
import MuiSnackbar from '../../components/MuiSnackBar';


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
            showSnackbar("success", "Registrado com sucesso! Realize o login")
            navigate('/login')
        })
        .catch((err) => {
            if(!err.response) {
                showSnackbar("error", "Servidor do padaflix fora do ar")
            }
            else{
                showSnackbar("error", "Ocorreu um erro no registro")
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

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success")

    function showSnackbar( severity: AlertColor, message: string){
        setOpenSnackbar(true)
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
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
                <>
                    <AddressForm 
                        onSubmit={finishRegister} 
                        onGoBack={goToPreviousRegisterStep} 
                        defaultData={userRegisterData.endereco}
                        disabled={isFetching}
                    />
                    <MuiSnackbar 
                        open = {openSnackbar} 
                        setOpen = {setOpenSnackbar} 
                        message = {snackbarMessage} 
                        severity = {snackbarSeverity}
                    />
                </>
            )
    }
}
 
export default RegisterUser;