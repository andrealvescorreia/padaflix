import axiosInstance from "../../axios";
import PadariaCard from "../../components/PadariaCard";
import { PadariaUser, User, isUser } from "../../types/User";
import "./styles.scss"
import { useEffect, useState } from "react";
import { LinearProgress, TextField } from "@mui/material";
import { useSnackbar } from 'notistack';
import InputMask from 'react-input-mask';
import axios from "axios";

interface Props {
    user: User | PadariaUser | undefined
}
interface Padaria {
    id: number,
    nome_fantasia: string
}

const PadariasList = ({user} : Props) => {
    const [padarias, setPadarias] = useState<Padaria[]> ([]);
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isDoneFetching, setIsDoneFetching] = useState<boolean>(false)

    const [inputCep, setInputCep] = useState('');
    const [cepIsValid, setCepIsValid] = useState<boolean>()

    const { enqueueSnackbar } = useSnackbar();
    const [ cidadeAndUf, setCidadeAndUf] = useState('');

    function isCepValid(cep: String){
        return cep.length == 8
    }

    const fetchPadarias = async (cep: String) => {
        
        setCepIsValid(true)
        setIsFetching(true)
        setIsDoneFetching(false)
        axiosInstance.get('/padarias/cep/'+cep)
        .then((response) => {
            setPadarias(response.data);
        })
        .catch((err) => {
            console.log(err.response.data)
            setPadarias([])
        })
        .finally(()=>{
            setIsFetching(false)
            setIsDoneFetching(true)
        })
    }

    interface ViaCepApiResponse {
        cep: string,
        logradouro: string, // equivale a rua
        complemento: string,
        bairro: string,
        localidade: string, // equivale a cidade
        uf: string,
    }

    

    async function queryCidadeAndUfFromCep(cep: String){
        return axios.get("https://viacep.com.br/ws/"+ cep +"/json/")
        .then((response) => {
            if (response.data.erro) throw 'Bad request'
            const cepData : ViaCepApiResponse = response.data;
            return `${cepData.localidade} - ${cepData.uf}`
        })
        .catch(() => { throw 'Bad request' })
    }   

    async function onSubmitInputCep(){
        if(isCepValid(inputCep) == false) {
            setCepIsValid(false)
            return
        }
        setCidadeAndUf(await queryCidadeAndUfFromCep(inputCep))
        fetchPadarias(inputCep)
    }

    useEffect(() => {
        if(isUser(user)) {
            fetchPadarias(user.endereco.cep)
            aaa()
        }
    }, [])

    async function aaa() {
        if(isUser(user)) {
        setCidadeAndUf(await queryCidadeAndUfFromCep(user.endereco.cep))
    }
    }

    function CepInput() {
        return <InputMask 
            mask = "99999-999"  
            value = {inputCep}
            onChange = { e => setInputCep((e.target.value).replace('-', '').replaceAll('_', '')) }
            onBlur = { () => onSubmitInputCep() }
        >
            <TextField className="cep-input"
                size="small"
                label = "CEP" 
                error = {cepIsValid == false}
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        onSubmitInputCep
                        ev.preventDefault()
                    }
                }}
                helperText= {cepIsValid == false ? 'CEP incorreto' : ' '}
            />
        </InputMask>
    }

    return <div id="padarias-list">
        { isFetching && <LinearProgress className="linear-progress" /> }
        <div className="header">
            { 
                user == undefined 
                && CepInput() 
            }
            { 
                isDoneFetching &&
                <h2>Padarias em  { cidadeAndUf }</h2>}
            {   
                user == undefined && !isFetching && inputCep == '' && !isDoneFetching && 
                <h2>Insira seu CEP</h2> 
            }
        </div>
        
        <div className="grid">
            {
                padarias?.map(padaria => 
                    <PadariaCard 
                        padaria={padaria} 
                        key={padaria.id} 
                    />
                )
            }
            {
                padarias.length == 0 && isDoneFetching && cepIsValid &&
                <h2>Sem padarias na sua cidade :(</h2>
            }
        </div>
    </div>;
}
 
export default PadariasList;
