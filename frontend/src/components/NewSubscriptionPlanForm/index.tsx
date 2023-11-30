import { useState, SyntheticEvent, useEffect } from "react";
import { Button, Container, InputAdornment, Stack, TextField } from "@mui/material";
import "./styles.scss";
import { PlanoAssinatura } from "../../types/PlanoAssinatura";


interface NewSubscriptionPlanFormProps {
    onSubmit: (plano: PlanoAssinatura) => void,
    onCancel: () => void,
    disabled: boolean,
}

const NewSubscriptionPlanForm = ({ onSubmit, onCancel, disabled } : NewSubscriptionPlanFormProps) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [pessoasServidas, setPessoasServidas] = useState(1);
    const [preco, setPreco] = useState<number | null>(null);
    const nomeMaxCharacters = 80;
    const descricaoMaxCharacters = 250;
    const pessoasServidarMin = 1;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const plano : PlanoAssinatura = {
            nome, descricao, preco, pessoas_servidas: pessoasServidas
        }
        onSubmit(plano)
    }

    return (
        <Container id="new-subscription-plan-form" maxWidth="sm" >
            <Stack 
                onSubmit = { handleSubmit } 
                component = "form"
                autoComplete = "off"
            >
                <h2 className="form-title">Novo Plano de Assinatura</h2>

                <TextField 
                    label="Nome" 
                    value={nome}
                    onChange={e => setNome(e.target.value)} 
                    margin="dense"
                    required
                    inputProps={{ maxLength: nomeMaxCharacters }}
                    helperText={"Até "+nomeMaxCharacters+" caracteres"}
                    disabled={disabled}
                />
                <TextField 
                    label="Descricao" 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)} 
                    multiline
                    rows={4}
                    margin="dense"
                    required
                    inputProps={{ maxLength: descricaoMaxCharacters }}
                    helperText={"Até "+descricaoMaxCharacters+" caracteres"}
                    disabled={disabled}
                />

                <TextField 
                    label="Pessoas servidas" 
                    value={pessoasServidas}
                    type="number"
                    onChange={e => {
                        let value = parseInt(e.target.value)
                        if(value < pessoasServidarMin) value = pessoasServidarMin
                        setPessoasServidas(value)
                    }} 
                    margin="dense"
                    required
                    variant="standard"
                    InputProps={{
                        inputProps: { 
                            max: 10, min: 1 
                        }
                    }}
                    disabled={disabled}
                />
                
                <TextField 
                    label="Valor de assinatura" 
                    value={preco ? preco : ''}
                    type="number"
                    
                    onChange={e => {
                        const numberInput = e.target.value;
                        if (numberInput === '')
                            setPreco(null)
                        else
                            setPreco(parseFloat(numberInput))
                    }} 
                    onKeyDown={(e) => {
                        const key = e.key
                        if (key === "e" || key === "E" || key === "-" || key === "+") 
                            e.preventDefault()
                        if (key === '0' && preco === null )
                            e.preventDefault()
                    }}
                    margin="dense"
                    required
                    variant="standard"
                    InputProps={{
                        inputProps: { min: 1.00 , step: 0.01},
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    disabled={disabled}
                />
                <div className = "bttns-box">
                    <Button 
                        variant="contained" 
                        className='cancel bttn'
                        disabled={disabled}
                        onClick={onCancel}
                    >Cancelar
                    </Button>

                    <Button 
                        variant="contained" 
                        type="submit"
                        className='submit bttn'
                        disabled={disabled}
                    >Criar
                    </Button>
                </div>
            </Stack>
        </Container>
  );
}
 
export default NewSubscriptionPlanForm;