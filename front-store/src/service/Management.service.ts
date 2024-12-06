import FetchRequest from "../api/apiFetch";

export class ManagementService {
  public static async login(user: { email: string; password: string }) {
    try {
      const url = `api/management/login`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(user),
      });
    } catch (error) {
      throw new Error(`error when crate person : ${error}`);
    }
  }

  public static async getCodeAccess(email: string) {
    try {
      const url = `api/management/password-code`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      throw new Error(`error when crate person : ${error}`);
    }
  }

  public static async changePassword(data: {
    email: string | null;
    password: string;
    recoverPasswordCode: string | null;
  }) {
    try {
      const url = `api/management/password-change`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error(`error when crate person : ${error}`);
    }
  }
}
