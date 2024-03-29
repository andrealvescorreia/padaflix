import * as React from 'react';
import { SyntheticEvent, useState, useEffect } from "react";
import { Button, Container, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import "./styles.scss";
import InputMask from 'react-input-mask';
import { MdLocationOn } from "react-icons/md";
import axios from 'axios';
import { Endereco } from '../../types/Endereco';

interface ViaCepApiResponse {
    cep: string,
    logradouro: string, // equivale a rua
    complemento: string,
    bairro: string,
    localidade: string, // equivale a cidade
    uf: string,
}

interface AddressFormProps {
    onSubmit?: (endereco: Endereco) => void,
    onGoBack?: (endereco: Endereco) => void,
    defaultData?: Endereco,
    disabled?: boolean,
}

const AddressForm = ( props : AddressFormProps ) => {
    const { 
        onSubmit = ()=>{}, 
        onGoBack = ()=>{}, 
        defaultData = {cep: '', rua: '', numero: undefined, uf: '', cidade: '', complemento: '', bairro: ''} as Endereco, 
        disabled = false 
    } = props
   
    const [endereco, setEndereco] = useState<Endereco>(defaultData)

    const [cepIsValid, setCepIsValid] = useState(true)
    const [ruaWasAutoFilled, setRuaWasAutoFilled] = useState(false)
    const [bairroWasAutoFilled, setBairroWasAutoFilled] = useState(false)
    const [viaCepIsOnline, setViaCepIsOnline] = useState(false);

    const handleSubmit = (e : SyntheticEvent) => {
        e.preventDefault()
        onSubmit(endereco);
    }
    const handleGoBack = (e : SyntheticEvent) => {
        e.preventDefault()
        onGoBack(endereco);
    }

    function updateEnderecoAfterViaCepQuery(viaCepResponse : ViaCepApiResponse){
        setEndereco(prevEndereco => (
            {
                ...prevEndereco, 
                cidade: viaCepResponse.localidade,
                uf: viaCepResponse.uf,
            }
        ))
        
        if(viaCepResponse.logradouro != ""){
            setRuaWasAutoFilled(true)
            setEndereco(prevEndereco => ({...prevEndereco, rua: viaCepResponse.logradouro}))
        }

        if(viaCepResponse.bairro != ""){
            setBairroWasAutoFilled(true)
            setEndereco(prevEndereco => ({...prevEndereco, bairro: viaCepResponse.bairro}))
        }
    }

    function clearForm(){
        setRuaWasAutoFilled(false)
        setBairroWasAutoFilled(false)
        setEndereco({cep: endereco.cep, rua: '', numero: undefined, uf: '', cidade: '', complemento: '', bairro: ''} as Endereco)
    }

    function badCepRequest() {
        setCepIsValid(false)
        clearForm()
    }

    function queryCepData(){
        axios.get("https://viacep.com.br/ws/"+ endereco.cep +"/json/")
        .then((response) => {
            setViaCepIsOnline(true);
            if (response.data.erro) badCepRequest()
            else {
                setCepIsValid(true)
                updateEnderecoAfterViaCepQuery(response.data)
            }
        })
        .catch((e) => {
            console.log(e)
            if(e.code === 'ERR_NETWORK'){
                setViaCepIsOnline(false);
            }
        })
    }

    useEffect(() => {
        if(defaultData.cep != "") queryCepData()
    }, [])
    useEffect(() => {
        if(endereco.cep.replace('_','').length === 8) queryCepData()
    }, [endereco.cep])

    return (
        <Container id="address-form-container" maxWidth="sm" > 
            <header className = "form-header">
                <MdLocationOn/>
                <h1>Endereço</h1>
            </header>
            
            <Stack 
                onSubmit = { handleSubmit } 
                className = "form"
                component = "form"
                autoComplete = "off"
            > 
                <InputMask 
                    mask = "99999-999"  
                    value = {endereco.cep}
                    onChange = { e => setEndereco( prevEndereco => 
                        ({ ...prevEndereco, cep: (e.target.value).replace('-', '') })
                    )}
                    onBlur = { queryCepData }
                    disabled={disabled}
                >
                    <TextField 
                        label = "CEP" 
                        required 
                        error = {!cepIsValid} 
                    />
                </InputMask>

                <TextField
                    disabled = {ruaWasAutoFilled || disabled}
                    label = "Logradouro" 
                    required
                    value = {endereco.rua}
                    onChange = { (e) => setEndereco( prevEndereco => 
                        ({ ...prevEndereco, rua: e.target.value })
                    )}
                    
                />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 3fr' },
                        gap: 2,
                    }}
                    >
                    <TextField
                        label = "Número" 
                        required
                        type='number'
                        value = {endereco.numero}
                        InputProps={{ inputProps: { min: 1 } }}
                        onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                e.preventDefault()
                            }
                            if (e.key === '0' && endereco.numero == undefined) {
                                e.preventDefault()
                            }
                        }}
                        onChange={(e) => {
                            const numberInput = e.target.value;
                            if (numberInput === '')
                                setEndereco( prevEndereco => (
                                    { ...prevEndereco, numero: undefined } 
                                ))
                            else
                                setEndereco( prevEndereco => (
                                    { ...prevEndereco, numero: parseInt(numberInput) } 
                                ))
                        }}
                        disabled={disabled} 
                    />
                    <TextField 
                        label = "Complemento" 
                        value = {endereco.complemento}
                        onChange = { e => setEndereco( prevEndereco => 
                            ({ ...prevEndereco, complemento: e.target.value } )
                        )}
                        disabled={disabled}
                    />
                </Box>
                <TextField
                    disabled = {bairroWasAutoFilled || disabled}
                    label = "Bairro" 
                    required
                    value={endereco.bairro}
                    onChange = { e => setEndereco( prevEndereco => 
                        ({ ...prevEndereco, bairro: e.target.value } )
                    )}
                />
                <TextField 
                    disabled = {viaCepIsOnline}
                    label = "Cidade" 
                    required
                    value = {endereco.cidade}
                    onChange = { e => setEndereco( prevEndereco => 
                        ({ ...prevEndereco, cidade: e.target.value } )
                    )}
                />

                <TextField 
                    disabled = {viaCepIsOnline}
                    label = "UF" 
                    required
                    value = {endereco.uf}
                    onChange = { e => setEndereco(prevEndereco => 
                        ({ ...prevEndereco, uf: e.target.value } )
                    )}
                />

                <div className = "bttns-box">
                    <Button 
                        variant = "contained" 
                        className = 'back bttn'
                        onClick = { handleGoBack } 
                        disabled={disabled}
                    >Voltar
                    </Button>

                    <Button 
                        variant = "contained" 
                        type = "submit"
                        className = 'submit bttn'
                        disabled={disabled}
                    >Criar conta
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}

export default AddressForm;