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
        if(isSubscribed == undefined) return
        setSubscribed(isSubscribed(plano))
    }, [plano])



    return (
        <button id="subscription-plan-card" onClick={()=> {if(!subscribed){onClick(plano)}}// gambiarra: se ja for assinante, não deixa clicar
            }>
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
        </button>
    );
}
 
export default PlanoCard;


