// src/api/axios.ts
import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import { refresh } from "@/api/endpoints/auth";

let csrfToken: string | null = null;
export const setCsrfToken = (v: string | null) => {
  csrfToken = v;
};

const apiClient = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 非GETは X-CSRF-Token を自動付与
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const method = (config.method ?? "get").toUpperCase();
  const needsCsrf = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (needsCsrf && csrfToken) {
    // headers は AxiosHeaders を使う
    const headers =
      (config.headers as AxiosHeaders | undefined) ?? new AxiosHeaders();
    headers.set("X-CSRF-Token", csrfToken);
    config.headers = headers;
  }
  return config;
});

// 401 は 1回だけ /auth/refresh → リトライ
let refreshing = false;
let queue: Array<() => void> = [];
const runQueued = async () => {
  queue.forEach((fn) => fn());
  queue = [];
};

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retried?: boolean };
    const status = error.response?.status;

    if (status === 401 && !original?._retried) {
      original._retried = true;

      if (refreshing) {
        await new Promise<void>((resolve) => queue.push(resolve));
      } else {
        try {
          refreshing = true;
          const r = await refresh();
          const newCsrf = (r.data as any)?.csrf_token ?? null;
          setCsrfToken(newCsrf);
        } catch {
          refreshing = false;
          queue = [];
          return Promise.reject(error);
        } finally {
          refreshing = false;
          await runQueued();
        }
      }
      return apiClient(original);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
