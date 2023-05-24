import { SyntheticEvent, useState } from "react";
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
    onSubmit: (endereco: Endereco) => void;
    onGoBack: (endereco: Endereco) => void;
    defaultData: Endereco
}

const AddressForm = ( props : AddressFormProps ) => {
    const { onSubmit, onGoBack, defaultData } = props
   
    const [endereco, setEndereco] = useState<Endereco>(defaultData)

    const [cepIsValid, setCepIsValid] = useState(true)
    const [ruaWasAutoFilledByQuery, setRuaWasAutoFilledByQuery] = useState(false)
    const [bairroWasAutoFilledByQuery, setBairroWasAutoFilledByQuery] = useState(false)

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
                rua: viaCepResponse.logradouro,
                bairro: viaCepResponse.bairro,
                complemento: viaCepResponse.complemento
            }
        ))

        setRuaWasAutoFilledByQuery(viaCepResponse.logradouro != "")
        setBairroWasAutoFilledByQuery(viaCepResponse.bairro != "")
    }

    function clearForm(){
        setRuaWasAutoFilledByQuery(false)
        setBairroWasAutoFilledByQuery(false)
        setEndereco({cep: endereco.cep, rua: '', numero: '', uf: '', cidade: '', complemento: '', bairro: ''} as Endereco)
    }

    function badCepRequest() {
        setCepIsValid(false)
        clearForm()
    }

    function queryCepData(){
        axios.get("https://viacep.com.br/ws/"+ endereco.cep +"/json/")
        .then((response) => {
            if (response.data.erro) badCepRequest
            else {
                setCepIsValid(true)
                updateEnderecoAfterViaCepQuery(response.data)
            }
        })
        .catch(() => badCepRequest)
    }

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
                >
                    <TextField 
                        label = "CEP" 
                        required 
                        error = {cepIsValid} 
                    />
                </InputMask>

                <TextField
                    disabled = {ruaWasAutoFilledByQuery}
                    label = "Logradouro" 
                    required
                    value = {endereco.rua}
                    onChange = { e => setEndereco( prevEndereco => 
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
                        type = "number" 
                        value = {endereco.numero}
                        onChange = { e => setEndereco( prevEndereco => 
                            ({ ...prevEndereco, numero: e.target.value } )
                        )}
                    />
                    <TextField 
                        label = "Complemento" 
                        value = {endereco.complemento}
                        onChange = { e => setEndereco( prevEndereco => 
                            ({ ...prevEndereco, complemento: e.target.value } )
                        )}
                    />
                </Box>
                <TextField
                    disabled = {bairroWasAutoFilledByQuery}
                    label = "Bairro" 
                    required
                    value={endereco.bairro}
                    onChange = { e => setEndereco( prevEndereco => 
                        ({ ...prevEndereco, bairro: e.target.value } )
                    )}
                />
                <TextField 
                    disabled
                    label = "Cidade" 
                    required
                    value = {endereco.cidade}
                    onChange = { e => setEndereco( prevEndereco => 
                        ({ ...prevEndereco, cidade: e.target.value } )
                    )}
                />

                <TextField 
                    disabled 
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
                    >Voltar
                    </Button>

                    <Button 
                        variant = "contained" 
                        type = "submit"
                        className = 'submit bttn'
                    >Criar conta
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}

export default AddressForm;