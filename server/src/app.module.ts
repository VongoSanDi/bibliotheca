import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionModule } from './modules/collection/collection.module';
import { VolumeModule } from './modules/volume/volume.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { LanguageModule } from './modules/language/language.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { SerieModule } from './modules/serie/serie.module';
import { TypeModule } from './modules/type/type.module';
import { AuthorModule } from './modules/author/author.module';
import { PublisherModule } from './modules/publisher/publisher.module';
import { GenreModule } from './modules/genre/genre.module';
import { EditionModule } from './modules/edition/edition.module';
import { CountryModule } from './modules/country/country.module';
import { BoxSetModule } from './modules/box-set/box-set.module';
import { BoxSetBookModule } from './modules/box-set-book/box-set-book.module';
import { StatusModule } from './modules/status/status.module';
import { AuthModule } from './modules/auth/auth.module';
import { CollectionVolumeModule } from './modules/collection-volume/collection-volume.module';
import { BookTitleTranslationModule } from './modules/book-title-translation/book-title-translation.module';
import ormconfig from './db/ormconfig';

@Module({
  imports: [
    CollectionModule,
    TypeOrmModule.forRoot(ormconfig),
    VolumeModule,
    UserModule,
    BookModule,
    LanguageModule,
    CurrencyModule,
    SerieModule,
    TypeModule,
    AuthorModule,
    PublisherModule,
    GenreModule,
    EditionModule,
    CountryModule,
    BoxSetModule,
    BoxSetBookModule,
    StatusModule,
    AuthModule,
    CollectionVolumeModule,
    BookTitleTranslationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
