import { Endereco } from "./Endereco";

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
}

export function isPadariaUser(object: any): object is PadariaUser {
  return 'nome_fantasia' in object;
}

export function isUser(object: any): object is User {
  return 'nome' in object;
}