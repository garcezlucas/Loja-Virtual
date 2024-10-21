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
}