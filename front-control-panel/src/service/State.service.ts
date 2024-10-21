import FetchRequest from "../api/apiFetch";

export class StateService {
  public static async getAllStates() {
    try {
      const url = `api/state/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all states : ${error}`);
    }
  }

  public static async createStates(state: { name: string; acronym: string }) {
    try {
      const url = `api/state/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(state),
      });
    } catch (error) {
      throw new Error(`error when crate state : ${error}`);
    }
  }

  public static async updateStates(state: {
    id: number;
    name: string;
    acronym: string;
  }) {
    try {
      const url = `api/state/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(state),
      });
    } catch (error) {
      throw new Error(`error when crate state : ${error}`);
    }
  }

  public static async deleteState(id: number) {
    try {
      const url = `api/state/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete state : ${error}`);
    }
  }
}
