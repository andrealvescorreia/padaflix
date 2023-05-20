import * as React from 'react';
import { SyntheticEvent, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import "./styles.scss";
import InputMask from 'react-input-mask';
import { MdLocationOn } from "react-icons/md";
import axios from 'axios';
import { Endereco } from '../../types/Endereco';



interface AddressProps {
    onSubmit: (endereco: Endereco) => void;
    onGoBack: () => void;
}


const AddressForm = ( props: AddressProps ) => {
    const { onSubmit, onGoBack } = props
   

    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const [logradouroWasAutocompletedByApiRequest, setLogradouroWasAutocompletedByApiRequest] = useState(false)
    const [bairroWasAutocompletedByApiRequest, setBairroWasAutocompletedByApiRequest] = useState(false)


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const endereco: Endereco = {
            cep, rua, numero, complemento, bairro, cidade, uf
        }
        onSubmit(endereco);
    }

    interface ViaCepResponseBody{
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string,
    }

    function updateValuesAfterApiRequest(apiResponse: ViaCepResponseBody){
        setLogradouroWasAutocompletedByApiRequest(false)
        setBairroWasAutocompletedByApiRequest(false)
        
        setCidade(apiResponse.localidade)
        setUf(apiResponse.uf)
        setRua(apiResponse.logradouro)
        setBairro(apiResponse.bairro)
        setComplemento(apiResponse.complemento)

        if(apiResponse.logradouro != ""){
            setLogradouroWasAutocompletedByApiRequest(true)
        }
        if(apiResponse.bairro != ""){
            setBairroWasAutocompletedByApiRequest(true)
        }
    }

    function clearForm(){
        setLogradouroWasAutocompletedByApiRequest(false)
        setBairroWasAutocompletedByApiRequest(false)
        setCidade('')
        setUf('')
        setRua('')
        setComplemento('')
        setBairro('')
        setNumero('')
    }

    function queryCepData(){
        axios.get("https://viacep.com.br/ws/"+ cep +"/json/")
        .then(function (response) {
            updateValuesAfterApiRequest(response.data)
        })
        .catch(function (error) {
            clearForm()
            alert('cep invalido');
        })
    }

    return (
        <Container id="address-form-container" maxWidth="sm" >
            <header className='form-header'>
                <MdLocationOn/>
                <h1>
                    Endereço
                </h1>
            </header>

            <FormControl variant="standard" onSubmit={handleSubmit} className='form' 
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                }}
                component="form"
                autoComplete="off"
            > 
                <CepInput 
                    cep={cep} 
                    setCep={setCep}
                    onBlur={queryCepData}
                />
                <TextField
                    disabled={logradouroWasAutocompletedByApiRequest}
                    label="Logradouro" 
                    required
                    value={rua}
                    onChange={e => setRua(e.target.value)}
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
                        value={numero}
                        onChange={e => setNumero(e.target.value)} 
                    />
                    <TextField 
                        label="Complemento" 
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)} 
                    />
                </Box>
                <TextField
                    disabled={bairroWasAutocompletedByApiRequest}
                    label="Bairro" 
                    required
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                />
                <TextField 
                    label="Cidade" 
                    required
                    disabled
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                />

                <TextField 
                    label="UF" 
                    required
                    disabled 
                    value={uf}
                    onChange={e => setUf(e.target.value)} 
                />

                <div className="bttns-box">
                    <Button 
                        variant="contained" 
                        className='back bttn'
                        onClick={onGoBack}
                    >Voltar
                    </Button>

                    <Button 
                        variant="contained" 
                        type="submit"
                        className='submit bttn'
                    >Criar conta
                    </Button>
                </div>
            </FormControl>
        </Container>
    )
}


interface CepInputProps {
    cep: string,
    setCep: (cep: string) => void
    onBlur: () => void
}

function CepInput({cep, setCep, onBlur}: CepInputProps) {
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCep(event.target.value);
    };

    return (
        <InputMask 
            mask="99999-999"  
            value={cep}
            onBlur={onBlur}
            onChange={handleChange}
        >
            <TextField label="CEP" required fullWidth/>
        </InputMask>
    )
}


export default AddressForm;