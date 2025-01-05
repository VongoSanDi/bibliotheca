import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'user_collection',
})
export class UserCollection {
  @ViewColumn()
  user_id: number;

  @ViewColumn()
  username: string;

  @ViewColumn()
  serie_title: string;

  @ViewColumn()
  book_number: number;

  @ViewColumn()
  original_title: string;

  @ViewColumn()
  translated_title: string;

  @ViewColumn()
  author: string;

  @ViewColumn()
  acquisition_date: Date;

  @ViewColumn()
  acquisition_price: number;

  @ViewColumn()
  currency_symbol: string;
}
