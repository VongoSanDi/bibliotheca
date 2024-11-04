import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './collection/collection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolumeModule } from './volume/volume.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { LanguageModule } from './language/language.module';
import { CurrencyModule } from './currency/currency.module';
import { SerieModule } from './serie/serie.module';
import { TypeModule } from './type/type.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { GenreModule } from './genre/genre.module';
import { EditionModule } from './edition/edition.module';
import { CountryModule } from './country/country.module';
import { BoxSetModule } from './box-set/box-set.module';
import { BoxSetBookModule } from './box-set-book/box-set-book.module';
import { StatusModule } from './status/status.module';
import ormconfig from './db/ormconfig';

@Module({
  imports: [CollectionModule, TypeOrmModule.forRoot(ormconfig), VolumeModule, UserModule, BookModule, LanguageModule, CurrencyModule, SerieModule, TypeModule, AuthorModule, PublisherModule, GenreModule, EditionModule, CountryModule, BoxSetModule, BoxSetBookModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
