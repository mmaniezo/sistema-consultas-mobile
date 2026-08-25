import { EspecialidadeUsuario } from "../types/usuario";

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: EspecialidadeUsuario;
  ativo: boolean;
}
