import './styles.scss'

interface PlanoCardProps {
    plano : PlanoAssinatura
}

const PlanoCard = ({plano} : PlanoCardProps) => {

    return (
        <div id="subscription-plan-card">
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
                <span className='price'>
                    R${plano.preco} /mês
                </span>
                
            </div>
            <img className="img"></img>
        </div>
    );
}
 
export default PlanoCard;