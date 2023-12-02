import { Endereco } from "./Endereco"
import { PlanoAssinatura } from "./PlanoAssinatura"

export interface Assinatura {
    id: number,
    cliente: number, //id do cliente
    cliente_nome: string
    plano: number, // id do plano
    data_inicio: string,
    assinado: boolean,
    preco: number | null,
}

export interface AssinaturaUser extends Assinatura {
    nome_plano: string
    id_padaria: number
    nome_padaria: string
}

export interface AssinaturaPadaria extends Assinatura {
    nome_plano: string
    endereco_cliente: Endereco
}

export interface PlanoWithAssinaturas extends PlanoAssinatura {
    assinaturas: AssinaturaPadaria[]
}