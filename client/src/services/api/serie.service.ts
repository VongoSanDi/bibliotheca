import { Serie } from "../../types/entities/serie.entity";
import { ApiService } from "./api.service";

export class SerieService extends ApiService<Serie> {
  protected baseUrl = `${import.meta.env.VITE_API_URL}`;
  protected endpoint = '/serie';

  async searchByName(title: string): Promise<Serie[]> {
    return this.fetchApi<Serie[]>(`${this.baseUrl}/title?name=${encodeURIComponent(title)}`);
  }
}
