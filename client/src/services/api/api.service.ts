import { ApiResponse, PaginationParams } from "../../types/apis/api";

export abstract class ApiService<T> {
  protected abstract baseUrl: string;
  protected abstract endpoint: string;

  protected get url(): string {
    return `${this.baseUrl}${this.endpoint}`;
  }

  protected async fetchApi<R>(url: string, options: RequestInit = {}): Promise<R> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'An issue occured')
    }
    return result
  }

  async getAll(paginationParams?: PaginationParams): Promise<ApiResponse<T[]>> {
    const queryParams = new URLSearchParams()
    if (paginationParams?.page) queryParams.append('page', paginationParams.page.toString());
    if (paginationParams?.take) queryParams.append('take', paginationParams.take.toString());
    if (paginationParams?.order) queryParams.append('order', paginationParams.order);
    if (paginationParams?.orderBy) queryParams.append('orderBy', paginationParams.orderBy);

    const url = `${this.url}?${queryParams.toString()}`;
    return this.fetchApi<ApiResponse<T[]>>(url);
  }

  async getById(id: number): Promise<ApiResponse<T>> {
    return this.fetchApi(`${this.url}/${id}`)
  }

  async create(data: Partial<T>): Promise<ApiResponse<T>> {
    return this.fetchApi(this.url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updatePatch(id: number, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.fetchApi(`${this.url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async updatePut(id: number, data: T): Promise<ApiResponse<T>> {
    return this.fetchApi(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async delete(id: number): Promise<ApiResponse<T>> {
    return this.fetchApi(`${this.url}/${id}`, {
      method: 'DELETE'
    })
  }
}
