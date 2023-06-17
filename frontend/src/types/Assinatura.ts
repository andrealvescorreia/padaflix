export interface Assinatura{
    id: number,
    cliente: number, //id do cliente
    cliente_nome: string
    plano: number, // id do plano
    data_inicio: string,
    assinado: boolean,
}