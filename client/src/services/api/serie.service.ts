import { Serie } from "../../types/apis/serie";
import { ApiService } from "./api.service";

export class SerieService extends ApiService<Serie> {
  protected baseUrl = `${import.meta.env.VITE_API_URL}`;
  protected endpoint = '/serie';

  async searchByName(title: string): Promise<Serie[]> {
    return this.fetchApi<Serie[]>(`${this.url}/search?name=${encodeURIComponent(title)}`);
  }
}
