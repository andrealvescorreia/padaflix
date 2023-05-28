import { useState, SyntheticEvent } from "react";
import { Button, Container, InputAdornment, Stack, TextField } from "@mui/material";
import "./styles.scss";
import axiosInstance from "../../axios";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

const NewSubscriptionPlan = () => {

    interface PlanoAssinatura{
        nome: string,
        descricao: string,
        preco: number,
        pessoas_servidas: number
    }

    const [isFetching, setIsFetching] = useState(false)

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const createSubscriptionPlan = async (plano: PlanoAssinatura) => {
        setIsFetching(true)
        axiosInstance.post('/plano_de_assinatura', plano)
        .then(() => {
            enqueueSnackbar("Plano de Assinatura criado", { variant: 'success'})
        })
        .catch((err) => {
            if(!err.response) {
                enqueueSnackbar('Servidor do padaflix fora do ar', { variant: 'error'})
            }
            else{
                enqueueSnackbar("Ocorreu um erro: "+JSON.stringify(err.response.data), { variant: 'error'})
                console.log(err.response.data)
            }
        })
        .finally(()=>{
            setIsFetching(false)
        })
    }

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [pessoasServidas, setPessoasServidas] = useState(1);
    const [preco, setPreco] = useState<number>(0);
    const nomeMaxCharacters = 80;
    const descricaoMaxCharacters = 250;
    const pessoasServidarMin = 1;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const plano : PlanoAssinatura = {
            nome, descricao, preco, pessoas_servidas: pessoasServidas
        }
        createSubscriptionPlan(plano)
    }

    return (
        <Container id="new-subscription-plan" maxWidth="sm" >
            { isFetching ? <LinearProgress /> : null}
            <Stack 
                onSubmit = { handleSubmit } 
                component = "form"
                autoComplete = "off"
            >
                <h2>Novo Plano de Assinatura</h2>

                <TextField 
                    label="Nome" 
                    value={nome}
                    onChange={e => setNome(e.target.value)} 
                    margin="dense"
                    required
                    inputProps={{ maxLength: nomeMaxCharacters }}
                    helperText={"Até "+nomeMaxCharacters+" caracteres"}
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
                />
                
                <TextField 
                    label="Valor de assinatura" 
                    value={preco}
                    type="number"
                    onChange={e => setPreco(parseFloat(e.target.value))} 
                    margin="dense"
                    required
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>
                    }}
                />

                <Button 
                    variant="contained" 
                    type="submit"
                    className='submit bttn'
                >Criar
                </Button>
            </Stack>
           

        </Container>
  );
}
 
export default NewSubscriptionPlan;