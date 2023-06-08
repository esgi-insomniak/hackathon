interface authRequest {
  token: string;
}

interface requestById {
  id: string | number;
}

interface requestBody {
  body: {
    [key: string]: any;
  };
}

interface requestParams {
  params?: {
    [key: string]: any;
  };
}
