import * as React from 'react';
import { SyntheticEvent, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';


interface AddressProps {
    onSubmit: (cep: string, logradouro: string, numero: number, complemento: string, bairro: string, cidade: string, uf: string) => void;
}


const AddressForm = (/* props:AddressProps */) => {
    //const { onSubmit } = props

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState(0);
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        
        //onSubmit(cep, logradouro, numero, complemento, bairro, cidade, uf);
    }

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit} >
                <FormControl variant="standard" 
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                > 
                    <CepInput cep={cep} setCep={setCep}/>
                    <TextField label="Logradouro*"  />
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr 2fr' },
                            gap: 2,
                        }}
                    >
                        <TextField label="Número*" type="number" />
                        <TextField label="Complemento" />
                    </Box>
                    <TextField label="Bairro*"  />
                    <TextField label="Cidade*" disabled />
                    <TextField label="UF*" disabled />
                    

                    <Button variant="contained"  type="submit">Receba</Button>

                </FormControl>
            </form>
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
            <Input
                value={cep}
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