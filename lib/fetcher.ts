export const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());
