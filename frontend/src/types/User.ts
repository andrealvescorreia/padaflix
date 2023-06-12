import { Endereco } from "./Endereco";
import { PlanoAssinatura } from "./PlanoAssinatura";

export interface User {
  id: number,
  nome: string,
  email: string,
  endereco: Endereco
}

export interface PadariaUser {
  id: number,
  nome_fantasia: string,
  email: string,
  cnpj: string,
  telefone: string,
  endereco: Endereco
  plano_assinatura: PlanoAssinatura[]
}

export function isPadariaUser(object: any): object is PadariaUser {
  if(object == undefined) return false;
  return 'nome_fantasia' in object;
}

export function isUser(object: any): object is User {
  if(object == undefined) return false;
  return 'nome' in object;
}