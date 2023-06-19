import "./styles.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PadariaUser, User, defaultPadaria, isUser } from "../../types/User";
import { PlanoAssinatura } from "../../types/PlanoAssinatura";
import PlanoCard from "../../components/PlanoCard";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import axiosInstance from "../../axios";
import { enqueueSnackbar } from "notistack";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    outline: 0,
};

interface PadariaProfileProps {
    user: User | undefined | PadariaUser
    afterSuccessfulSubscription: () => void
}

const PadariaProfile = ({user, afterSuccessfulSubscription} : PadariaProfileProps) => {
    const { id } = useParams();// url params
    
    const [padaria, setPadaria] = useState<PadariaUser>(defaultPadaria);
    const [isSubscribedToPadaria, setIsSubscribedToPadaria] = useState(false)
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [planModalContent, setPlanModalContent] = useState<PlanoAssinatura>();
    const [currentTab, setCurrentTab] = useState('1');
    const [isFetchingPadaria, setIsFetchingPadaria] = useState(false);

    const openPlanModal = (plano: PlanoAssinatura) => {
        setPlanModalContent(plano)
        setIsPlanModalOpen(true)
    }
    const closePlanModal = () => setIsPlanModalOpen(false);

    const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const assinarPlano = async () => {
        axiosInstance.post('usuario/assinaturas', {
            cliente: user?.id,
            plano: planModalContent?.id
        })
        .then(()=>{
            enqueueSnackbar('Assinado com sucesso',{ variant: 'success'})
            setIsPlanModalOpen(false)
            afterSuccessfulSubscription()
        })
        .catch((err)=>{
            enqueueSnackbar('Ocorreu um erro ao tentar realizar a assinatura',{ variant: 'error'})
            console.log(err.response.data)
        })
    }

    function isUserSubscribedToPlan(plano: PlanoAssinatura) {
        if(!isUser(user)) return false
    
        let isSubscribedToPlan = false
        user.assinatura.forEach(assinatura => {
            if(plano.id == assinatura.plano && user.id == assinatura.cliente && assinatura.assinado){
                isSubscribedToPlan = true
                setIsSubscribedToPadaria(true)
            }
        })
        return isSubscribedToPlan
    }

    const fetchPadaria = async () => {
        setIsFetchingPadaria(true)
        axiosInstance.get('/padarias/'+id)
        .then((response)=>{
            setPadaria(response.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
        .finally(()=>setIsFetchingPadaria(false))
    }


    const fetchCidade = async () => {// gambiarra pra pegar a cidade, ja que ela nao fica salva no BD
        if(padaria.endereco.cep == '') return
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


    function renderCurrentTabContent() {
        switch(currentTab) {
            case '1':
                if(padaria?.plano_assinatura.length == 0 && !isFetchingPadaria){
                    return <h2>Sem planos :(</h2>
                }
                return(
                    <div className="plans-grid">
                        {
                            padaria?.plano_assinatura?.map(plano => 
                                <PlanoCard plano={plano} onClick={openPlanModal} isSubscribed={isUserSubscribedToPlan} key={plano.id} />
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


    useEffect(() => {
        fetchPadaria()
    }, [id, user])

    useEffect(() => {
        fetchCidade()
    }, [padaria])


    return (
        <div id="padaria-profile">
            <div className='header'>

                <div className="header-padaria">
                    <img className="padaria-logo"></img>
                    <h2 className='padaria-name'> {padaria?.nome_fantasia} </h2>
                    <div className="rating">
                        <FaStar/>
                        <p className="number">0</p>
                    </div>
                    {
                        isSubscribedToPadaria && 
                        <div className='subscription-status'>
                            <CheckIcon/>
                            Assinante
                        </div>
                    }
                    
                    <hr/>
                </div>

                <div className='tabs'>
                    <TabContext value={currentTab}>
                        <TabList onChange={handleTabChange}>
                            <Tab label="Planos" value="1" className='tab' />
                            <Tab label="Sobre" value="2" className='tab'/>
                        </TabList>
                    </TabContext>
                </div>
            </div>
            
            <Modal
                open={isPlanModalOpen}
                onClose={closePlanModal}
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        {planModalContent?.nome}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {planModalContent?.descricao}
                    </Typography>
                    <Button variant = "contained" onClick = { assinarPlano } >
                        Assinar R${planModalContent?.preco}/mês
                    </Button>
                </Box>
            </Modal>

            { renderCurrentTabContent() }

        </div>
    );
}
 
export default PadariaProfile;