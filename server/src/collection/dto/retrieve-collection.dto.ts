export class RetrieveCollectionDto {
  readonly id: number;
}

export class UserCollectionResponseDto {
  id: number;
  username: string;
  serie_name: string;
  book_number: number;
  original_title: string;
  translated_title: string;
  author: string;
  acquisition_date: Date;
  acquisition_price: number;
  currency_symbol: string;
}
