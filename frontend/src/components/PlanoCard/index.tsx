import { useState, useEffect } from 'react';
import { PlanoAssinatura } from '../../types/PlanoAssinatura';
import './styles.scss'

interface PlanoCardProps {
    plano : PlanoAssinatura
    onClick: (plano: PlanoAssinatura) => void;
    isSubscribed: (plano: PlanoAssinatura) => boolean,
}




const PlanoCard = ({plano, onClick, isSubscribed} : PlanoCardProps) => {
    const [sub, setSub] = useState<boolean>(false)
    
 
    
    useEffect(() => {
        setSub(isSubscribed(plano))
        
    }, [])

    useEffect(() => {
        console.log('sub: ' + sub)
        
        
    }, [sub])

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
                <span className={'price' + (sub ? ' subscribed' : '')}>
                    R${plano.preco} /mês
                </span>
                
            </div>
            <img className="img"></img>
        </div>
    );
}
 
export default PlanoCard;


