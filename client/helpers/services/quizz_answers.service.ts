import ApiService from "@/helpers/services/api.generic.service";

export default class QuizzAnswerService {
  static entityName = "quizz_answers";

  static async getCollection({ token, params = {} }: authRequest & requestParams): Promise<any> {
    return await ApiService.getCollection(this.entityName, { token, params });
  }

  static async get({ token, id }: authRequest & requestById) {
    return await ApiService.get(this.entityName, { token, id });
  }

  static async post({ token, body }: authRequest & requestBody) {
    return await ApiService.post(this.entityName, { token, body });
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
