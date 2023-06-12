import { useState } from "react";
import "./styles.scss";
import axiosInstance from "../../axios";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import NewSubscriptionPlanForm from "../../components/NewSubscriptionPlanForm";
import { PlanoAssinatura } from "../../types/PlanoAssinatura";


const NewSubscriptionPlan = () => {

    const [isFetching, setIsFetching] = useState(false)

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const createSubscriptionPlan = async (plano: PlanoAssinatura) => {
        setIsFetching(true)
        axiosInstance.post('/plano_de_assinatura', plano)
        .then(() => {
            enqueueSnackbar("Plano de assinatura criado", { variant: 'success'})
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

    function cancel(){
        navigate('/padaria-planos')
    }
    
    return (
        <div id="new-subscription-plan">
            { isFetching ? <LinearProgress className="linear-progress" /> : null }
            <NewSubscriptionPlanForm onSubmit={createSubscriptionPlan} onCancel={cancel} disabled={isFetching}/>
        </div>
    );
}
 
export default NewSubscriptionPlan;