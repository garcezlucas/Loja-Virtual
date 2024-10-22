import FetchRequest from "../api/apiFetch";

export class PermissionsService {
  public static async getAllPermissions() {
    try {
      const url = `api/permission/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all permissions : ${error}`);
    }
  }

  public static async createPermission(permission: { name: string }) {
    try {
      const url = `api/permission/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(permission),
      });
    } catch (error) {
      throw new Error(`error when crate permission : ${error}`);
    }
  }

  public static async updatePermission(permission: { id: number; name: string }) {
    try {
      const url = `api/permission/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(permission),
      });
    } catch (error) {
      throw new Error(`error when crate permission : ${error}`);
    }
  }

  public static async deletePermission(id: number) {
    try {
      const url = `api/permission/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete permission : ${error}`);
    }
  }
}
