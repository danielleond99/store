import { AxiosInstance, AxiosResponse } from "axios";

export class BaseCrudService {
  constructor(
    private readonly _axiosInstance: AxiosInstance,
    private readonly url: string
  ) {}

  get<T, D = any>(url: string, params?: D): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(`${url}`, { params });
  }

  post<T, S>(url: string, input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.post<T>(`${url}`, input);
  }

  put<T, S>(url: string, input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.put<T>(`${url}`, input);
  }

  delete<T>(url: string): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.delete<T>(`${url}`);
  }

  getItems<T, D = any>(params?: D): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(this.url, { params });
  }

  getItemById<T, S = any>(
    itemId: string,
    params?: S
  ): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(`${this.url}/${itemId}`, {
      params,
    });
  }

  createItem<T, S>(input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.post<T>(this.url, input);
  }

  updateItem<T, S>(input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.put<T>(this.url, input);
  }

  filter<T = any, S = any>(input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(this.url, {
      params: input,
    });
  }
}
