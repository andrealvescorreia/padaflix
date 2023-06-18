export interface Assinatura{
    id: number,
    cliente: number, //id do cliente
    cliente_nome: string
    plano: number, // id do plano
    data_inicio: string,
    assinado: boolean,
}

export interface AssinaturaUser{
    id: number
    cliente: number //id do cliente
    cliente_nome: string
    plano: number // id do plano
    nome_plano: string
    id_padaria: number
    nome_padaria: string
    data_inicio: string
    assinado: boolean
}