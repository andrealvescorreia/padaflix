import { useState, useEffect } from 'react';
import { PlanoAssinatura } from '../../types/PlanoAssinatura';
import CheckIcon from '@mui/icons-material/Check';
import './styles.scss'

interface PlanoCardProps {
    plano : PlanoAssinatura
    onClick?: (plano: PlanoAssinatura) => void;
    isSubscribed?:  (plano: PlanoAssinatura) => boolean,
}


const PlanoCard = ({plano, onClick = () => {}, isSubscribed} : PlanoCardProps) => {
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        if(!isSubscribed) return
        setSubscribed(isSubscribed(plano))
    }, [plano])

    return (
        <div id="subscription-plan-card" onClick={()=> onClick(plano)}>
            <div className='plan-info'>
                <h2 className='name'>
                    {plano.nome}
                </h2>
                <span className='description'>
                    {plano.descricao}
                </span>
                <span className='served_people'>
                    { 'Serve ' + plano.pessoas_servidas + (plano.pessoas_servidas > 1 ? ' pessoas' : ' pessoa')} 
                </span>
                <span className={'price' + (subscribed ? ' subscribed' : '')}>
                    <CheckIcon/>
                    R${plano.preco} /mês
                </span>
                
            </div>
            <img className="img"></img>
        </div>
    );
}
 
export default PlanoCard;


