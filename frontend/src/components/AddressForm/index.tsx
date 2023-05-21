import * as React from 'react';
import { SyntheticEvent, useState } from "react";
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

    const [ruaWasAutoFilledByQuery, setRuaWasAutoFilledByQuery] = useState(false)
    const [bairroWasAutoFilledByQuery, setBairroWasAutoFilledByQuery] = useState(false)

    const [invalidCep, setInvalidCep] = useState(false)

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        let newCep = cep.replace('-', '')
        setCep(newCep)
        const endereco: Endereco = {
            cep, rua, numero, complemento, bairro, cidade, uf
        }
        onSubmit(endereco);
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
        
        setCidade(apiResponse.localidade)
        setUf(apiResponse.uf)
        setRua(apiResponse.logradouro)
        setBairro(apiResponse.bairro)
        setComplemento(apiResponse.complemento)

        if(apiResponse.logradouro != "") setRuaWasAutoFilledByQuery(true)
        
        if(apiResponse.bairro != "") setBairroWasAutoFilledByQuery(true)
        
    }

    function clearForm(){
        setRuaWasAutoFilledByQuery(false)
        setBairroWasAutoFilledByQuery(false)
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
            setInvalidCep(false)
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
                    mask="99999999"  
                    value={cep}
                    onBlur={queryCepData}
                    onChange={e => setCep(e.target.value)}
                >
                    <TextField label="CEP" required fullWidth error={invalidCep} />
                </InputMask>

                <TextField
                    disabled={ruaWasAutoFilledByQuery}
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
                    disabled={bairroWasAutoFilledByQuery}
                    label="Bairro" 
                    required
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                />
                <TextField 
                    disabled
                    label="Cidade" 
                    required
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                />

                <TextField 
                    disabled 
                    label="UF" 
                    required
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
            </Stack>
        </Container>
    )
}

export default AddressForm;