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



interface AddressProps {
    onSubmit: (endereco: Endereco) => void;
    onGoBack: (endereco: Endereco) => void;
    defaultData: Endereco
}


const AddressForm = ( props: AddressProps ) => {
    const { onSubmit, onGoBack, defaultData } = props
   
    const [endereco, setEndereco] = useState<Endereco>(defaultData)


    const [ruaWasAutoFilledByQuery, setRuaWasAutoFilledByQuery] = useState(false)
    const [bairroWasAutoFilledByQuery, setBairroWasAutoFilledByQuery] = useState(false)

    const [invalidCep, setInvalidCep] = useState(false)

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSubmit(endereco);
    }
    const handleGoBack = (e: SyntheticEvent) => {
        e.preventDefault()
        onGoBack(endereco);
    }


    interface ViaCepResponseBody{
        cep: string,
        logradouro: string, // equivale a rua
        complemento: string,
        bairro: string,
        localidade: string, // equivale a cidade
        uf: string,
    }

    function updateValuesAfterApiRequest(apiResponse: ViaCepResponseBody){
        setRuaWasAutoFilledByQuery(false)
        setBairroWasAutoFilledByQuery(false)
        
        setEndereco(prevEndereco => (
            {
                ...prevEndereco, 
                cidade: apiResponse.localidade,
                uf: apiResponse.uf,
                rua: apiResponse.logradouro,
                bairro: apiResponse.bairro,
                complemento: apiResponse.complemento
            }
        ))

        if(apiResponse.logradouro != "") setRuaWasAutoFilledByQuery(true)
        
        if(apiResponse.bairro != "") setBairroWasAutoFilledByQuery(true)
        
    }

    function clearForm(){
        setRuaWasAutoFilledByQuery(false)
        setBairroWasAutoFilledByQuery(false)
        setEndereco({rua: '', numero: '', uf: '', cidade: '', complemento: '', bairro: ''} as Endereco)
    }

    function queryCepData(){
        axios.get("https://viacep.com.br/ws/"+ endereco.cep +"/json/")
        .then(function (response) {
            if(response.data.erro != true){
                updateValuesAfterApiRequest(response.data)
                setInvalidCep(false)
            } else{
                clearForm()
                setInvalidCep(true)
            }
        })
        .catch(function (error) {
            clearForm()
            setInvalidCep(true)
        })
    }

    return (
        <Container id="address-form-container" maxWidth="sm" >
            <header className='form-header'>
                <MdLocationOn/>
                <h1>Endereço</h1>
            </header>

            <Stack onSubmit={handleSubmit} className='form'
                component="form"
                autoComplete="off"
            > 
                <InputMask 
                    mask="99999-999"  
                    value={endereco.cep}
                    onBlur={queryCepData}
                    onChange={ e => setEndereco(prevEndereco => (
                        {
                            ...prevEndereco, 
                            cep: (e.target.value).replace('-', '')
                        }
                    ))
                } 
                >
                    <TextField label="CEP" required fullWidth error={invalidCep} />
                </InputMask>

                <TextField
                    disabled={ruaWasAutoFilledByQuery}
                    label="Logradouro" 
                    required
                    value={endereco.rua}
                    onChange={ e => setEndereco(prevEndereco => (
                        {
                            ...prevEndereco, 
                            rua: e.target.value
                        }
                    ))
                    } 
                />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 3fr' },
                        gap: 2,
                    }}
                    >
                    <TextField 
                        label="Número" 
                        required
                        type="number" 
                        value={endereco.numero}
                        onChange={ e => setEndereco(prevEndereco => (
                            {
                                ...prevEndereco, 
                                numero: e.target.value
                            }
                        ))
                        } 
                    />
                    <TextField 
                        label="Complemento" 
                        value={endereco.complemento}
                        onChange={ e => setEndereco(prevEndereco => (
                            {
                                ...prevEndereco, 
                                complemento: e.target.value
                            }
                        ))
                        } 
                    />
                </Box>
                <TextField
                    disabled={bairroWasAutoFilledByQuery}
                    label="Bairro" 
                    required
                    value={endereco.bairro}
                    onChange={ e => setEndereco(prevEndereco => (
                        {
                            ...prevEndereco, 
                            bairro: e.target.value
                        }
                    ))
                    } 
                />
                <TextField 
                    disabled
                    label="Cidade" 
                    required
                    value={endereco.cidade}
                    onChange={ e => setEndereco(prevEndereco => (
                        {
                            ...prevEndereco, 
                            cidade: e.target.value
                        }
                    ))
                    } 
                />

                <TextField 
                    disabled 
                    label="UF" 
                    required
                    value={endereco.uf}
                    onChange={ e => setEndereco(prevEndereco => (
                            {
                                ...prevEndereco, 
                                uf: e.target.value
                            }
                        ))
                    } 
                />

                <div className="bttns-box">
                    <Button 
                        variant="contained" 
                        className='back bttn'
                        onClick={handleGoBack}
                    >Voltar
                    </Button>

                    <Button 
                        variant="contained" 
                        type="submit"
                        className='submit bttn'
                    >Criar conta
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}

export default AddressForm;