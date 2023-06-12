import './styles.scss'
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import axiosInstance from '../../../axios';
import { PadariaUser, User, isPadariaUser } from '../../../types/User';
import { useEffect, useState } from 'react';
import PlanoCard from '../../../components/PlanoCard';
import { PlanoAssinatura } from '../../../types/PlanoAssinatura';

interface PlanosPadariaProps {
    padaria: PadariaUser | User | undefined // talvez receba User ou undefined de App.tsx , o que não queremos.
}

const PlanosPadaria = ({padaria}: PlanosPadariaProps) => {

    const [planos, setPlanos] = useState<PlanoAssinatura[]>()


    const fetchPlanos = async () => {
        if(!isPadariaUser(padaria)) return

        axiosInstance.get('/plano_de_assinatura/padaria/' + padaria.id)
        .then((response) => {
            setPlanos(response.data)
        })
        .catch(() => {})
    }

    useEffect(() => {
        fetchPlanos()
    }, [])

    return (
        <div id="usuario-padaria-planos">
            <Link to="/padaria-planos/new" >
                <Button variant = "outlined" className="new-plan bttn">Adicionar plano</Button>
            </Link>


            <h1 className='header'>
                Meus Planos
            </h1>

            <div className='planos'>
                {
                    planos?.map(plano => 
                        <PlanoCard plano={plano}/>
                    )
                }
            </div>
        </div>
    );
}
 
export default PlanosPadaria;