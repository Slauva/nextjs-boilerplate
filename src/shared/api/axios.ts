import { getAuthToken, resetAuthToken } from "@/shared/api/auth";
import axios, { AxiosRequestConfig } from "axios";

const getInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_PATH,
  });

  instance.interceptors.request.use(
    (request) => {
      const token = getAuthToken();
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;
      if (response.status === 401) {
        resetAuthToken();
        return Promise.reject(error);
      }
    },
  );

  return instance;
};

export const $api = getInstance();

export const axiosQuery = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = $api<T>({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
