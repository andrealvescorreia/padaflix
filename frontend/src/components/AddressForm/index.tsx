import * as React from 'react';
import { SyntheticEvent, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';
import "./styles.scss";

import { MdLocationOn } from "react-icons/md";

interface Address {
    cep: string, logradouro: string, numero: number, complemento: string, bairro: string, cidade: string, uf: string
}

interface AddressProps {
    onSubmit: (cep: string, logradouro: string, numero: number, complemento: string, bairro: string, cidade: string, uf: string) => void;
}


const AddressForm = (/* props:AddressProps */) => {
    //const { onSubmit } = props
    let emptyAddres : Address = {
        cep: '',
        logradouro: '',
        numero: 0,
        complemento: '', 
        bairro: '', 
        cidade: '', 
        uf: ''
    }

    const [endereco, setEndereco] = useState<Address>(emptyAddres)
    /*//setEndereco([...endereco])
    setEndereco((previousState) => (
        {   ...previousState, 
            cep:'aaaaa'
        }
    ))*/
    //alert(endereco)

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState<number>();
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        alert(cep+ logradouro+ numero+ complemento+ bairro+cidade+uf)
        //onSubmit(cep, logradouro, numero, complemento, bairro, cidade, uf);
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
                />
                <TextField 
                    label="Logradouro" 
                    required
                    margin='dense'
                    value={logradouro}
                    onChange={e => setLogradouro(e.target.value)}
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
                        onChange={e => setNumero(parseInt(e.target.value))} 
                    />
                    <TextField 
                        label="Complemento" 
                        margin='dense'
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)} 
                    />
                </Box>
                <TextField 
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
}
  
function CepInput({cep, setCep}: CepInputProps) {
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCep(event.target.value);
    };
  
    return (
        <div>
            <InputLabel htmlFor="formatted-text-mask-input">CEP*</InputLabel>
            <OutlinedInput
                value={cep}
                onBlur={()=>{alert('a')}}
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