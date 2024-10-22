import FetchRequest from "../api/apiFetch";

export class ImagesService {
  public static async getAllImages() {
    try {
      const url = `api/image/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all cities : ${error}`);
    }
  }

  public static async uploadImage(formData: FormData) {
    try {
      const url = `api/image/`;

      return await FetchRequest(url, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      throw new Error(`error when crate image : ${error}`);
    }
  }

  public static async updateImage(image: { id: number; name: string }) {
    try {
      const url = `api/image/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(image),
      });
    } catch (error) {
      throw new Error(`error when crate image : ${error}`);
    }
  }

  public static async deleteImage(id: number) {
    try {
      const url = `api/image/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete image : ${error}`);
    }
  }
}
