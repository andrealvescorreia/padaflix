import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import PlanoCard from "../../components/PlanoCard";
import "./styles.scss"
import { PadariaUser } from "../../types/User";
import { FaStar } from 'react-icons/fa';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


const PadariaProfile = () => {
    const { id } = useParams();
    //const [planos, setPlanos] = useState<PlanoAssinatura[]>();
    
    const templatePadaria : PadariaUser = {
        id: 1,
        nome_fantasia: 'Nome da padaria',
        endereco: {
            cep: '58748000', 
            rua: 'Rua sei lá Oque', 
            numero: '10', 
            complemento: 'Do lado do carajá', 
            bairro: 'Centro', 
            cidade: 'Agua Branca', 
            uf: 'PB'
        },
        email: 'padaria@email.com',
        cnpj: '31.877.403/0001-47',
        telefone: '(83) 9 91234567',
        plano_assinatura: [{
            nome: 'Plano 1', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis tortor et augue ornare consequat. Aliquam sit amet eros mauris. Donec ornare dolor id magna semper sollicitudin. Phasellus ullamcorper quis nunc imperdiet consequat. Nunc maximus hendrerit felis, et finibus lorem ultricies ac. Aliquam id arcu non arcu molestie pellentesque vitae nec leo. In viverra, erat nec elementum sollicitudin, purus erat commodo magna, id laoreet sapien eros et augue.', pessoas_servidas: 1, preco: 456.78
        }, {
            nome: 'Plano 2', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis tortor et augue ornare consequat. Aliquam sit amet eros mauris. Donec ornare dolor id magna semper sollicitudin. Phasellus ullamcorper quis nunc imperdiet consequat. Nunc maximus hendrerit felis, et finibus lorem ultricies ac. Aliquam id arcu non arcu molestie pellentesque vitae nec leo. In viverra, erat nec elementum sollicitudin, purus erat commodo magna, id laoreet sapien eros et augue.', pessoas_servidas: 2, preco: 123.45
        }]
    }

    const [padaria, setPadaria] = useState<PadariaUser>(templatePadaria);
    /*const fetchPlanos = async () => {
        axiosInstance.get('/plano_de_assinatura/'+id)
        .then((response)=>{
            setPlanos(response.data)
        })
    }

    useEffect(() => {
        fetchPlanos()
    }, [])*/

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
                            padaria.plano_assinatura?.map(plano => <PlanoCard plano={plano} />)
                        } 
                    </div>
                )
            case '2':
                return(
                    <div className='about'>
                        <h2>Endereco</h2>
                        <div className="address">

                            <span>{padaria.endereco.rua + ', ' + padaria.endereco.numero + '- ' + padaria.endereco.bairro}</span>
                            <span>{padaria.endereco.cidade + ' - ' + padaria.endereco.uf }</span>
                            <span>CEP: {padaria.endereco.cep}</span>

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
                    <h2 className='padaria-name'> {padaria.nome_fantasia} </h2>
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