import axios, { AxiosRequestHeaders } from "axios";

const API_URL = `${process.env.NEXT_API_ENTRYPOINT}`;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Accept"] = "application/ld+json";
axios.defaults.headers.common["Content-Type"] = "application/ld+json";
axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json";

//return default data
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 300; // default
};

export const getAxiosInstance = (token: string) => {
  const instance = axios.create();
  instance.interceptors.request.use(
    async (request) => {
      request.headers = {
        ...request.headers,
        ...authHeader(token),
      } as AxiosRequestHeaders;

      return request;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const authHeader = (token: string) => {
  return { Authorization: token };
};
