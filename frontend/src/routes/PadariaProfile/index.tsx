import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlanoCard from "../../components/PlanoCard";
import "./styles.scss"
import { PadariaUser } from "../../types/User";
import { FaStar } from 'react-icons/fa';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import axios from 'axios';


const PadariaProfile = () => {
    const { id } = useParams();
    

    const [padaria, setPadaria] = useState<PadariaUser>({} as PadariaUser);

    const fetchPadaria = async () => {
        axios.get('http://127.0.0.1:8000/api/padarias/'+id, { withCredentials: true })
        .then((response)=>{
            setPadaria(response.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }


    const fetchCidade = async () => {
        axios.get("https://viacep.com.br/ws/"+ padaria.endereco.cep +"/json/")
        .then((response) => {
            let newEndereco = padaria?.endereco;
            newEndereco.cidade = response.data.localidade
            setPadaria(prevPadaria => ({...prevPadaria, endereco: newEndereco}))


        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    useEffect(() => {
        fetchPadaria()
    }, [id])

    useEffect(() => {
        fetchCidade()
    }, [padaria])

    const [currentTab, setCurrentTab] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    function renderContent() {
        switch(currentTab) {
            case '1':
                return(
                    <div className="grid">
                        {
                            padaria?.plano_assinatura?.map(plano => <PlanoCard plano={plano} />)
                        } 
                    </div>
                )
            case '2':
                return(
                    <div className='about'>
                        <h2>Endereco</h2>
                        <div className="address">

                            <span>{padaria?.endereco.rua + ', ' + padaria?.endereco.numero + '- ' + padaria?.endereco.bairro}</span>
                            <span>{padaria?.endereco.cidade + ' - ' + padaria?.endereco.uf }</span>
                            <span>CEP: {padaria?.endereco.cep}</span>

                        </div>
                    </div>
                )
            default:
                return(<></>)
        }
    }

    return (
        <div id="padaria-profile">

            <div className='header'>

                <div className="header-padaria">
                    <img className="padaria-logo"></img>
                    <h2 className='padaria-name'> {padaria?.nome_fantasia} </h2>
                    <div className="rating">
                        <FaStar className="star"/>
                        <p className="number">0</p>
                    </div>
                    <hr/>
                </div>

                <div className='tabs'>
                    <TabContext value={currentTab}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab label="Planos" value="1" className='tab' />
                            <Tab label="Sobre" value="2" className='tab'/>
                        </TabList>
                    </TabContext>
                </div>
            </div>

            { renderContent() }

            
        </div>
    );
}
 
export default PadariaProfile;