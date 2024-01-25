import axiosInstance from "../../axios";
import PadariaCard from "../../components/PadariaCard";
import { PadariaUser, User, isUser } from "../../types/User";
import "./styles.scss"
import { useEffect, useState } from "react";
import { LinearProgress, TextField } from "@mui/material";
import InputMask from 'react-input-mask';
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface Props {
    user: User | PadariaUser | undefined
}
interface Padaria {
    id: number,
    nome_fantasia: string
}

const PadariasList = ({user} : Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [padarias, setPadarias] = useState<Padaria[]> ([]);
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isDoneFetching, setIsDoneFetching] = useState<boolean>(false)

    const [inputCep, setInputCep] = useState('');
    const [submitedCep, setSubmitedCep] = useState(false);
    const [isValidatingInputCep, setIsValidatingInputCep] = useState(false);
    const [isDoneValidatingInputCep, setIsDoneValidatingInputCep] = useState<boolean>(false)
    const [inputCepIsInvalid, setInputCepIsInvalid] = useState<boolean>(false)

    const [ cidadeAndUf, setCidadeAndUf ] = useState('');

    async function isCepValid(cep: String){
        if( cep.length != 8) return false
        try {
            await queryCidadeAndUfFromCep(cep)
        } catch (error) {
            return false
        }
        return true
    }

    const fetchPadarias = async (cep: String) => {
        setIsFetching(true)
        setIsDoneFetching(false)
        axiosInstance.get('/padarias/cep/'+cep)
        .then((response) => {
            setPadarias(response.data);
            //console.log(response.data)
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
        setSearchParams({cep: inputCep})
        setSubmitedCep(true)
        setIsValidatingInputCep(true)
        setIsDoneValidatingInputCep(false)
        if(await isCepValid(inputCep) == false) {
            setInputCepIsInvalid(true)
            setPadarias([])
            setIsValidatingInputCep(false)
            setIsDoneValidatingInputCep(true)
            return
        }
        setIsValidatingInputCep(false)
        setIsDoneValidatingInputCep(true)
        setInputCepIsInvalid(false)
        setCidadeAndUf(await queryCidadeAndUfFromCep(inputCep))
        fetchPadarias(inputCep)
    }

    useEffect(() => {
        async function ifUserThenFetchUsingHisCep() {
            if(isUser(user)) {
                setCidadeAndUf(await queryCidadeAndUfFromCep(user.endereco.cep))
                fetchPadarias(user.endereco.cep)
            }
            else {
                const cep = searchParams.get("cep") || "";
                setInputCep(cep);
            }
        }
        ifUserThenFetchUsingHisCep()
    }, [])

    useEffect(() => {
        if(inputCep.length == 8) onSubmitInputCep()
    }, [inputCep])

    function incorrectInputCepCondition(){
        return submitedCep && isDoneValidatingInputCep && inputCepIsInvalid
    }

    function CepInput() {
        return <InputMask 
            mask = "99999-999"  
            value = {inputCep}
            onChange = { e => {
                let cep = (e.target.value).replace('-', '').replaceAll('_', '')
                setInputCep(cep);
                
            }}
        >
            <TextField className="cep-input"
                size="small"
                label = "CEP" 
                error = { incorrectInputCepCondition() }
                helperText= { incorrectInputCepCondition() ? 'CEP incorreto' : ' '}
            />
        </InputMask>
    }

    return <div id="padarias-list">
        { 
            isFetching || isValidatingInputCep && 
            <LinearProgress className="linear-progress" /> 
        }
        <div className="header">
            { 
                user == undefined 
                && CepInput() 
            }
            {   
                user == undefined && !isFetching && !submitedCep && !isDoneFetching && 
                <h2>Insira seu CEP</h2> 
            }
            { 
                isDoneFetching && !inputCepIsInvalid &&
                <h2>Padarias em  { cidadeAndUf }</h2>
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
            
        </div>
        {
            padarias.length == 0 && isDoneFetching && !inputCepIsInvalid &&
            <h2> Sem padarias na sua cidade :( </h2>
        }
    </div>;
}
 
export default PadariasList;
