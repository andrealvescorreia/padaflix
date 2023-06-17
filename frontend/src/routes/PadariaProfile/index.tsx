import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlanoCard from "../../components/PlanoCard";
import "./styles.scss"
import { PadariaUser, User, isUser } from "../../types/User";
import { FaStar } from 'react-icons/fa';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import axios from 'axios';
import axiosInstance from "../../axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PlanoAssinatura } from "../../types/PlanoAssinatura";
import { enqueueSnackbar } from "notistack";
import CheckIcon from '@mui/icons-material/Check';
import { Assinatura } from "../../types/Assinatura";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 0,
};

interface PadariaProfileProps {
    user: User | undefined | PadariaUser
}

const PadariaProfile = ({user} : PadariaProfileProps) => {
    const { id } = useParams();
    
    const [open, setOpen] = useState(false);
    const openPlanModal = (plano: PlanoAssinatura) => {
        setPlanModal(plano)
        setOpen(true)
    }
    const closePlanModal = () => setOpen(false);

    const [planModal, setPlanModal] = useState<PlanoAssinatura>();

    const assinarPlano = async () => {
        if(!isUser(user)) return
        axiosInstance.post('usuario/assinaturas', {
            cliente: user.id,
            plano: planModal?.id
        })
        .then(()=>{
            enqueueSnackbar('Assinado com sucesso',{ variant: 'success'})
            setOpen(false)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    const defaultPadaria : PadariaUser = {
        id: 0,
        nome_fantasia: '',
        endereco: {
            cep: '', 
            rua: '', 
            numero: '', 
            complemento: '', 
            bairro: '', 
            cidade: '', 
            uf: ''
        },
        cnpj: '',
        email: '',
        telefone: '',
        plano_assinatura: [],
    }
    const [padaria, setPadaria] = useState<PadariaUser>(defaultPadaria);
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [assinaturasUser, setAssinaturasUser] = useState<Assinatura[]>();// usado para saber se o usuario é assinante da padaria

    const fetchPadaria = async () => {
        axiosInstance.get('/padarias/'+id)
        .then((response)=>{
            setPadaria(response.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }


    const fetchCidade = async () => {// gambiarra pra pegar a cidade, ja que ela nao fica salva no BD
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

    const fetchAssinaturas = async () => {
        if(!isUser(user)) return
        axiosInstance.get('/assinaturas/usuario/'+user.id)
        .then((response)=> {
            setAssinaturasUser(response.data) 
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    useEffect(() => {
        fetchPadaria()
        fetchAssinaturas()
    }, [id])

    useEffect(() => {
        
        //console.log('aaaaaaaaaaaa')
    }, [assinaturasUser])

    useEffect(() => {
        fetchCidade()
    }, [padaria])

    const isUserSubscribedToPlan = async (plano: PlanoAssinatura) => {
        console.log('executou')
        if(!isUser(user)) return false
        let assinaturas : Assinatura[]
        axiosInstance.get('/assinaturas/usuario/'+user.id)
        .then((response)=> {
            assinaturas = (response.data) 
            console.log(assinaturas)
            assinaturas.forEach(assinatura => {
                
                if(plano.id == assinatura.plano && user.id == assinatura.cliente && assinatura.assinado ){
                    console.log('assinadouuuu')
                    return true
                }
            })
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
        console.log('naooo assinadooo')
        return false
        
    }

    function isUserSubscribedToPlan2(plano: PlanoAssinatura) {
        
        if(!isUser(user)) return false
        if(assinaturasUser == undefined) console.log('ainda nao pegou as assinaturas')
        else console.log('pegou as assinaturas!')
        assinaturasUser?.forEach(assinatura => {
            
            if(plano.id == assinatura.plano && user.id == assinatura.cliente && assinatura.assinado ){
                console.log('assinadouuuu')
                return true
            }
        })
        console.log('nao assinado')
        return false
        
    }

    function funcao(){
        console.log('tomanananan')
        return true
    }

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
                            padaria?.plano_assinatura?.map(plano => 
                                <PlanoCard key={plano.id} plano={plano} onClick={openPlanModal} isSubscribed={()=>{
                                    return isUserSubscribedToPlan2(plano)
                                }}/>
                            )
                            
                        } 
                    </div>
                )
            case '2':
                return(
                    <div className='about'>
                        <div className="address">
                            <h2>Endereço</h2>
                            <span>{padaria?.endereco.rua + ', ' + padaria?.endereco.numero + '- ' + padaria?.endereco.bairro}</span>
                            <span>{padaria?.endereco.cidade + ' - ' + padaria?.endereco.uf }</span>
                            <span>CEP: {padaria?.endereco.cep.replace(/^(\d{5})(\d{3})/, "$1-$2")}</span>
                        </div>
                        <div className="other-info">
                            <h2>Outras informações</h2>
                            <span>CNPJ: {padaria?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</span>
                        </div>
                    </div>
                )
            default:
                return(<></>)
        }
    }

    return (
        <div id="padaria-profile">
            
            <Modal
                open={open}
                onClose={closePlanModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {planModal?.nome}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {planModal?.descricao}
                    </Typography>
                    <Button variant = "contained" onClick = { assinarPlano } >Assinar R${planModal?.preco}/mês</Button>
                </Box>
            </Modal>
            
            <div className='header'>

                <div className="header-padaria">
                    <img className="padaria-logo"></img>
                    <h2 className='padaria-name'> {padaria?.nome_fantasia} </h2>
                    <div className="rating">
                        <FaStar/>
                        <p className="number">0</p>
                    </div>
                    {
                        isSubscribed && 
                        <div className='subscription-status'>
                            <CheckIcon/>
                            Assinante
                        </div>
                    }
                    
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