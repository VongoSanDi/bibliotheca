import { UserCollectionResponseDto } from '../dto/retrieve-collection.dto';
import { UserCollection } from '../entities/user-collection.view-entity';

export class UserCollectionMapper {
  static toResponseDto(
    userCollection: UserCollection,
  ): UserCollectionResponseDto {
    return new UserCollectionResponseDto({
      user_id: userCollection.user_id,
      username: userCollection.username,
      serie_name: userCollection.serie_name,
      book_number: userCollection.book_number,
      translated_title: userCollection.translated_title,
      author: userCollection.author,
      acquisition_date: userCollection.acquisition_date,
      acquisition_price: userCollection.acquisition_price,
      currency_symbol: userCollection.currency_symbol,
    });
  }
}
