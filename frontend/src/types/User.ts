export interface User {
  id: number,
  name: string,
  email: string,
}

export interface PadariaUser {
  id: number,
  nome_fantasia: string,
  email: string,
  cnpj: string,
  telefone: string,
}

export function isPadariaUser(object: any): object is PadariaUser {
  return 'nome_fantasia' in object;
}

export function isUser(object: any): object is User {
  return 'name' in object;
}