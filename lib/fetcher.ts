interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
}

export const fetcher = <T>(url: string, options?: FetchOptions): Promise<T> =>
  fetch(url, {
    method: options?.method || "GET",
    headers: options?.headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json() as T);
