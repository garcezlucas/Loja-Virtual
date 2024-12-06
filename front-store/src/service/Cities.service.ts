import FetchRequest from "../api/apiFetch";

export class CitiesService {
  public static async getAllCities() {
    try {
      const url = `api/city/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all cities : ${error}`);
    }
  }

  public static async createCity(city: {
    name: string;
    state: { id: number };
  }) {
    try {
      const url = `api/city/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(city),
      });
    } catch (error) {
      throw new Error(`error when crate city : ${error}`);
    }
  }

  public static async updateCity(city: {
    id: number;
    name: string;
    state: { id: number };
  }) {
    try {
      const url = `api/city/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(city),
      });
    } catch (error) {
      throw new Error(`error when crate city : ${error}`);
    }
  }

  public static async deleteCity(id: number) {
    try {
      const url = `api/city/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete city : ${error}`);
    }
  }
}
