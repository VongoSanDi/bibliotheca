import { PaginatedApiResponse, PaginationParams } from "../../types/apis/api";
import { GetSerieTitleTranslationParams, SerieTitleTranslation } from "../../types/dtos/serie-title-translation.dto";
import { ApiService } from "./api.service";

export class SerieTitleTranslationService extends ApiService<SerieTitleTranslation> {
  protected baseUrl = `${import.meta.env.VITE_API_URL}`;
  protected endpoint = '/serie-title-translation';


  getSeriesTitleTranslation = async (params: GetSerieTitleTranslationParams, paginationParams: PaginationParams): Promise<PaginatedApiResponse<SerieTitleTranslation>> => {
    const queryParams = this.addPaginationParams(paginationParams)
    if (params.serie_id) {
      queryParams.append('serie_id', params.serie_id.toString());
    }
    if (params.translated_title) {
      queryParams.append('translated_title', params.translated_title);
    }

    return this.fetchApi<PaginatedApiResponse<SerieTitleTranslation>>(`${this.url}?${queryParams.toString()}`)
  }
}
