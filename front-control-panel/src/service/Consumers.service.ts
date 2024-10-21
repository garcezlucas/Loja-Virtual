import FetchRequest from "../api/apiFetch";
import { Person } from "../interfaces/Person";

export class ConsumersService {
  public static async getAllConsumers() {
    try {
      const url = `api/person/`;

      const response = await FetchRequest(url, {
        method: "GET",
      });

      return response.filter((person: Person) =>
        person.personPermissions?.some(
          (permission) => permission.permission.name.toLowerCase() === "cliente"
        )
      );
    } catch (error) {
      throw new Error(`error when searching all person: ${error}`);
    }
  }

  public static async createPerson(person: {
    name: string;
    cpf: string;
    email: string;
    address: string;
    codePostal: string;
    city: { id: number };
  }) {
    try {
      const url = `api/client/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(person),
      });
    } catch (error) {
      throw new Error(`error when crate person : ${error}`);
    }
  }

  public static async updatePerson(person: {
    id: number;
    name: string;
    cpf: string;
    email: string;
    address: string;
    codePostal: string;
    city: { id: number };
  }) {
    try {
      const url = `api/person/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(person),
      });
    } catch (error) {
      throw new Error(`error when crate person : ${error}`);
    }
  }

  public static async deletePerson(id: number) {
    try {
      const url = `api/person/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete person : ${error}`);
    }
  }
}
