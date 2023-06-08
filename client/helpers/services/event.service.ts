import ApiService from "@/helpers/services/api.generic.service";

export default class EventService {
  static entityName = "events";

  static async getCollection({ token, params = {} }: authRequest & requestParams): Promise<any> {
    return await ApiService.getCollection(this.entityName, { token, params });
  }

  static async get({ token, id }: authRequest & requestById) {
    return await ApiService.get(this.entityName, { token, id });
  }

  static async put({ token, id, body }: authRequest & requestById & requestBody) {
    return await ApiService.put(this.entityName, { token, id, body });
  }

  static async patch({ token, id, body }: authRequest & requestById & requestBody) {
    return await ApiService.patch(this.entityName, { token, id, body });
  }

  static async delete({ token, id }: authRequest & requestById) {
    return await ApiService.delete(this.entityName, { token, id });
  }
}
