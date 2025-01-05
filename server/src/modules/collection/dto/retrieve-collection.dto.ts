export class RetrieveCollectionDto {
  readonly user_id: number;
}

export class UserCollectionResponseDto {
  constructor(data: Partial<UserCollectionResponseDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  user_id: number;
  username: string;
  serie_title: string;
  book_number: number;
  original_title: string;
  translated_title: string;
  author: string;
  acquisition_date: Date;
  acquisition_price: number;
  currency_symbol: string;
}
