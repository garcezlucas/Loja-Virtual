import FetchRequest from "../api/apiFetch";

export class ManagementService {
  public static async login(user: { email: string; password: string }) {
    try {
      const url = `api/login/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(user),
      });
    } catch (error) {
      throw new Error(`error when crate person : ${error}`);
    }
  }
}
