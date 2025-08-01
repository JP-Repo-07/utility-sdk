import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type Method = 'GET' | 'POST';

export interface RequestOptions {
  headers?: Record<string, string>;
  queryParams?: Record<string, any>; // used as axios `params`
  body?: any; // used in POST as axios `data`
  timeout?: number;
}

export async function httpRequest<T = any>(
  method: Method,
  url: string,
  options: RequestOptions = {}
): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: options.headers,
    params: options.queryParams,        // ?key=value&...
    data: method === 'POST' ? options.body : undefined, // POST body
    timeout: options.timeout ?? 10000,   // default timeout
  };

  const response = await axios.request<T>(config);
  return response;
}