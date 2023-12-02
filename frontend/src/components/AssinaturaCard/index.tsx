import { Endereco } from '../../types/Endereco'
import './styles.scss'

interface AssinaturaCardProps {
  assinatura : {
    cliente_nome: string
    endereco_cliente: Endereco
    nome_plano: string
    preco: number | null
    data_inicio: string
  }
}

const AssinaturaCard = ({assinatura}: AssinaturaCardProps) => {
  return <div id="assinatura-card">
    <span className='client span'>
      <span className='client-name'>
        {assinatura.cliente_nome}
      </span>
      <span className='client-address'>  
        {assinatura.endereco_cliente.rua} - {assinatura.endereco_cliente.bairro} - {assinatura.endereco_cliente.numero}
      </span>
    </span>
    <span className='plan span'>
      {assinatura.nome_plano}
    </span>
    <span className='value span'>
      R${assinatura.preco}/mês
    </span>
    <span className='starting-date span'>
      {assinatura.data_inicio}
    </span>
  </div>;
}
 
export default AssinaturaCard;