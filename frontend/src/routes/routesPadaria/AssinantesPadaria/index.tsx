import AssinaturaCard from '../../../components/AssinaturaCard';
import './styles.scss'
import axiosInstance from '../../../axios';
import { PadariaUser, User, isPadariaUser } from '../../../types/User';
import { useEffect, useState } from 'react';
import { AssinaturaPadaria, PlanoWithAssinaturas } from '../../../types/Assinatura';
import { enqueueSnackbar } from 'notistack';

interface AssinantesPadariaProps {
    padariaUser: PadariaUser | User | undefined
}

const AssinantesPadaria = ({ padariaUser }: AssinantesPadariaProps) => {
    const [assinaturas, setAssinaturas] = useState<AssinaturaPadaria[]>([])

    const fetchAssinantes = async () => {
        if (!isPadariaUser(padariaUser)) return
        axiosInstance.get('/padaria/' + padariaUser.id + '/assinantes')
        .then((response) => {
            const planosComAssinaturas: PlanoWithAssinaturas[] = response.data
            const auxAssinaturas: AssinaturaPadaria[] = []
            planosComAssinaturas.forEach(plano => {
                plano.assinaturas.forEach(assinatura => {
                    auxAssinaturas.push({ ...assinatura, nome_plano: plano.nome, preco: plano.preco })
                })
            })
            setAssinaturas(auxAssinaturas)
        })
        .catch((err) => {
            enqueueSnackbar('Ocorreu um erro', { variant: 'error' })
            console.log(err.response.data)
        })
    }

    useEffect(() => {
        fetchAssinantes()
    }, [padariaUser])

    return (
        <div id="usuario-padaria-assinantes">
            <h2>Assinaturas Atuais</h2>
            { assinaturas?.map(assinatura => <AssinaturaCard assinatura={assinatura} />) }
        </div>
    );
}

export default AssinantesPadaria;