import { getAxiosInstance } from "@/helpers/axios/config";

export default class ApiService {
  static async getCollection(
    entityName: string,
    { token, params = {} }: authRequest & requestParams
  ): Promise<any> {
    return await getAxiosInstance(token)
      .get(entityName, { params: params })
      .then((response) => {
        return response.data;
      });
  }

  static async get(entityName: string, { token, id }: authRequest & requestById) {
    return getAxiosInstance(token)
      .get(`${entityName}/${id}`)
      .then((response) => {
        return response.data;
      });
  }

  static async post(entityName: string, { token, body }: authRequest & requestBody) {
    return getAxiosInstance(token)
      .post(entityName, body)
      .then((response) => {
        return response.data;
      });
  }

  static async put(
    entityName: string,
    { token, id, body }: authRequest & requestById & requestBody
  ) {
    return getAxiosInstance(token)
      .put(`${entityName}/${id}`, body)
      .then((response) => {
        return response.data;
      });
  }

  static async patch(
    entityName: string,
    { token, id, body }: authRequest & requestById & requestBody
  ) {
    return getAxiosInstance(token)
      .patch(`${entityName}/${id}`, body)
      .then((response) => {
        return response.data;
      });
  }

  static async delete(entityName: string, { token, id }: authRequest & requestById) {
    return getAxiosInstance(token)
      .delete(`${entityName}/${id}`)
      .then((response) => {
        return response.data;
      });
  }
}
