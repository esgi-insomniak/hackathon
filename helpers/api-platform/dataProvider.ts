import {
  fetchHydra as baseFetchHydra,
  hydraDataProvider,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import { useAuth } from "@clerk/nextjs";

export default () => {
  const { getToken } = useAuth();

  const API_ENTRYPOINT = process.env.NEXT_API_ENTRYPOINT || "";

  const authHeader = async () => {
    return { Authorization: (await getToken({ template: "api" })) as string };
  };

  const fetchAuthHydra = async (url: URL, options = {}) =>
    baseFetchHydra(url, {
      ...options,
      headers: await authHeader(),
    });

  const apiDocumentationParser = async () => {
    try {
      return await parseHydraDocumentation(API_ENTRYPOINT, {
        headers: await authHeader(),
      });
    } catch (result: any) {
      const { api, response, status } = result;
      return {
        api,
        response,
        status,
      };
    }
  };

  return hydraDataProvider({
    entrypoint: API_ENTRYPOINT,
    httpClient: fetchAuthHydra,
    apiDocumentationParser: apiDocumentationParser,
  });
};
