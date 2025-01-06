/**
 * take & page are sent as url params, meaning they are sent as strings
 * This pipe convert them into integer so it cas be check by zod and then used as pagination params
 * */
import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  transform(query: Record<string, string>) {
    return {
      ...query,
      take: query.take ? parseInt(query.take) : undefined,
      page: query.page ? parseInt(query.page) : undefined
    };
  }
}
