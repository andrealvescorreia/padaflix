import * as React from 'react';
import { SyntheticEvent, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';
import "./styles.scss";

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

    function pegarDadosCep(){
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

            <FormControl variant="standard"  onSubmit={handleSubmit} 
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                }}
                component="form"
                noValidate
                autoComplete="off"
            > 
                <CepInput 
                    cep={cep} 
                    setCep={setCep}
                    onBlur={pegarDadosCep}
                />
                <TextField
                    disabled={logradouroWasAutocompletedByApiRequest}
                    label="Logradouro" 
                    required
                    margin='dense'
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
                        margin='dense'
                        value={numero}
                        onChange={e => setNumero(e.target.value)} 
                    />
                    <TextField 
                        label="Complemento" 
                        margin='dense'
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)} 
                    />
                </Box>
                <TextField
                    disabled={bairroWasAutocompletedByApiRequest}
                    label="Bairro" 
                    required
                    margin='dense'
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                />
                <TextField 
                    label="Cidade" 
                    required
                    margin='dense' 
                    disabled
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                />

                <TextField 
                    label="UF" 
                    required
                    margin='dense' 
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
 

// André: daq pra baixo eu não entendo como funciona, só sei que funciona.

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
  
const CepMask = React.forwardRef<HTMLElement, CustomProps>(
    function CepMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00000-000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            
            />
      );
    },
);
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
        <div>
            <InputLabel htmlFor="formatted-text-mask-input">CEP*</InputLabel>
            <OutlinedInput
                value={cep}
                onBlur={onBlur}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={CepMask as any}
                fullWidth
            />
        </div>
    );
}



export default AddressForm;