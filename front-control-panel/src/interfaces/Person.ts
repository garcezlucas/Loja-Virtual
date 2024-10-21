import { City } from "./City";
import { Permission } from "./Permission";

export interface PersonPermission {
  id: number;
  permission: Permission;
  creationDate: Date | null;
  updateDate: Date | null;
}

export interface Person {
  id: number;
  name: string;
  cpf: string;
  email: string;
  recoverPasswordCode: string | null;
  sendCodeDate: Date | null;
  password: string;
  address: string;
  codePostal: string;
  city: City;
  personPermissions: PersonPermission[];
  creationDate: Date | null;
  updateDate: Date | null;
}
