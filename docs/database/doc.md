# Sommaire

1. [Introduction](#introduction)
    1. [Purpose](#purpose)
    2. [Context](#context)
    3. [Architecture](#architecture)
2. [Conventions & standards](#conventions_standards)
    1. [Naming conventions](#naming_conventions)
    2. [Standard Data Types](#standard_data_type)
3. [Tables structure](#tables_structure)
    1. [Reference tables](#reference_tables)
        1. [Country](#country)
        2. [Currency](#currency)
        3. [Language](#language)
        4. [Genre](#genre)
        5. [Type](#type)
        6. [Edition](#edition)
        7. [Status](#status)
        8. [Author](#author)
        9. [Publisher](#publisher)
        10. [User](#user)
        11. [Book](#book)
        12. [Volume](#volume)
        13. [Box set](#box_set)
        14. [Box set book](#box_set_book)
        15. [Collection](#collection)
        15. [Collection volume](#collection_volume)
        16. [Favorites](#favorites)
    2. [Views](#views)
        1. [User collection](#user_collection)
4. [Relationship](#relationship)
    1. [ERD Diagram](#erd_diagram)
5. [Security](#security)
6. [Maintenance](#maintenance)

---

<a id="introduction"></a>
# Introduction
<a id="purpose"></a>
## Purpose
This database is used to store the datas for the application bibliotheca.io. It allows the user to:
- Create a personal collection of books(whatever the format or type).
- Manage the collection such as the purchases
- Maintain detailed informations about the books, authors ...
- Improve the follow up status of the series and books
- Remind how much money the user spend on his collection

<a id="context"></a>
## Context
This application is part of a collection management application designed for:
- Private collectors who wish to catalog their collection
- Collectors who follow several series simultaneously
- Users managins multilingual collections(JAP/FR/IT ...)
- Collectors wishing to track the valu of their collection

<a id="architecture"></a>
## Architecture
- DBMS: MariaDB
- Encoding: UTF-8
- Timezone: UTC

<a id="conventions_standards"></a>
# Conventions and Standards
<a id="naming_conventions"></a>
## Naming Conventions

- Tables: UPPERCASE, singular name
- Columns: snake_case
- Primary keys: id
- Foreign keys: [table_name]_id
- Indexes: idx__[table_name]_[column]

<a id="standard_data_type"></a>
## Standard Data Types

- Identifiers: TINYINT - SMALLINT - MEDIUMINT - BIGINT, all UNSIGNED
- String: VARCHAR(n)
- Dates: DATE
- Booleans: BOOLEAN
- Amounts: DECIMAL(precision, scale)

<a id="tables_structure"></a>
# Tables structure
## Reference tables
<a id="country"></a>
### COUNTRY
#### Description
Store country reference data used across the application, we want to have it internally because it don't take much space and since it's used quite a lot it allow us to gain some bandwith since we won't need to query an open API.

#### Columns
| name         | type             | NULL | Default        |Description                    |
|--------------|------------------|------|----------------|------------------------------ |
| id           | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| country_name | VARCHAR(50)      | No   | None           | Full name of the country      |
| iso_code     | CHAR(2)          | No   | None           | ISO 3166 alpha-2 country code |

#### Contraints
- Primary Key: id
- Unique: country_name, iso_code

#### Example
| id | country_name   | iso_code |
| -- |----------------|----------|
| 1  | "France"       | "FR"     |
| 2  | "Corée du sud" | "KR"     |

<a id="currency"></a>
### CURRENCY
#### Description
Store currency reference data used across the application, it follows the same logic than COUNTRY

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| curency_name    | VARCHAR(50)      | No   | None           | Full name of the currency     |
| currency_symbol | CHAR(3)          | No   | None           | The symbol of the currency    |
| iso_code        | CHAR(3)          | No   | None           | ISO 4217 currency code        |

#### Contraints
- Primary Key: id
- Unique: currency_name, currency_symbol, iso_code

#### Example
| id | currency_name   | currency_symbol | iso_code |
| -- |-----------------|-----------------|----------|
| 1  | "Euro"          | "€"             | "EUR"    |
| 2  | "US Dollar"     | "$"             | "USD"    |

<a id="language"></a>
### LANGUAGE
#### Description
Store language reference data used across the application, it follows the same logic than COUNTRY

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| language_name   | VARCHAR(50)      | No   | None           | Full name of the language     |
| iso_code        | CHAR(2)          | No   | None           | ISO 639-1 language code       |

#### Contraints
- Primary Key: id
- Unique: language_name, iso_code

#### Example
| id | language_name | iso_code |
| -- |---------------|----------|
| 1  | "French"      | "fr"     |
| 2  | "Macedonian"  | "mk"     |

<a id="genre"></a>
### GENRE
#### Description
Store genre reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| genre_name      | VARCHAR(50)      | No   | None           | Full name of the genre        |

#### Contraints
- Primary Key: id
- Unique: genre_name

#### Example
| id | genre_name        |
|----|-------------------|
| 1  | "Shonen"          |
| 2  | "Science-fiction" |

<a id="type"></a>
### TYPE
#### Description
Store type reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| type_name       | VARCHAR(50)      | No   | None           | Full name of the genre        |

#### Contraints
- Primary Key: id
- Unique: type_name

#### Example
| id | type_name |
| -- |-----------|
| 1  | "Manga"   |
| 2  | "Roman"   |

<a id="edition"></a>
### EDITION
#### Description
Store edition reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| edition_name    | VARCHAR(50)      | No   | None           | Full name of the edition        |

#### Contraints
- Primary Key: id
- Unique: edition_name

#### Example
| id | edition_name |
| -- |--------------|
| 1  | "Standard"   |
| 2  | "Perfect"    |

<a id="status"></a>
### STATUS
#### Description
Store status reference data used across the application, we only store the status code and will use convert it in text in the client with i18n

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| status_code     | VARCHAR(50)      | No   | None           | Code of the status            |

#### Contraints
- Primary Key: id
- Unique: status_code

#### Example
| id | status_code |
| -- |-------------|
| 1  | "Completed" |
| 2  | "Ongoing"   |

<a id="author"></a>
### AUTHOR
#### description
Store the authors informations

#### columns
| Name            | Type               | Null | Default        |Description                    |
|-----------------|--------------------|------|----------------|-------------------------------|
| id              | MEDIUMINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| last_name       | VARCHAR(100)       | No   | None           | Author last name              |
| first_name      | VARCHAR(100)       | No   | None           | Author first name             |
| pen_name        | VARCHAR(100)       | No   | None           | Author pen name               |
| country_id      | TINYINT UNSIGNED   | No   | None           | Country of the author         |
| biogaphy        | TEXT COMPRESSED    | Yes  | None           | Short biograpgy of the author |

#### Contraints
- Primary Key: id
- Unique: last_name, first_name, pen_name, country_id
- Foreign Key: country_id -> COUNTRY.id

#### Example
| id | last_name  | first_name | pen_name         | country_id | biography |
| -- |------------|------------|------------------|------------|-----------|
| 1  | "Oda"      | "Eiichiro" | "Eiichiro Oda"   | 2          | "TEST"    |
| 2  | "Toriyama" | "Akira"    | "Akira Toriyama" | 2          | "TEST"    |

<a id="publisher"></a>
### PUBLISHER
#### Description
Store the publishers informations

#### Columns
| name            | type               | null | default        |description                    |
|-----------------|--------------------|------|----------------|-------------------------------|
| id              | SMALLINT UNSIGNED  | No   | AUTO_INCREMENT | Primary key                   |
| publisher_name  | VARCHAR(100)       | No   | None           | Publisher name                |
| website         | VARCHAR(255)       | Yes  | None           | Website of the publisher      |
| country_id      | TINYINT UNSIGNED   | Yes  | None           | Country of the publisher      |

#### Contraints
- Primary Key: id
- Unique: last_name, first_name, pen_name, country_id
- Foreign Key: country_id -> country.id

#### Example
| id | publisher_name | website                  | country_id |
| -- |----------------|--------------------------|------------|
| 1  | "Glénat"       | "https://www.glenat.com" | 2          |
| 2  | "Ki_oon"       | "https://www.ki-oon.com" | 2          |

## Main tables
<a id="user"></a>
### USER
#### Description
Stores user account informations

#### Columns
| Name            | Type               | NULL | Default            |Description                  |
|-----------------|--------------------|------|--------------------|-----------------------------|
| id              | MEDIUMINT UNSIGNED | No   | AUTO_INCREMENT     | Primary key                 |
| username        | VARCHAR(50)        | No   | No                 | Username of the user        |
| email           | VARCHAR(255)       | No   | No                 | Email of the user           |
| password_hash   | CHAR(60)           | No   | No                 | Hashed password of the user |
| birth_date      | DATE               | Yes  | No                 | Birth date of the user      |
| gender_id       | TINYINT UNSIGNED   | Yes  | No                 | Gender of the user          |
| country_id      | TINYINT UNSIGNED   | No   | No                 | Country of the user         |
| last_login      | DATE               | No   | No                 | Last time user logged in    |
| created_at      | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp   |
| created_by      | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record  |
| updated_at      | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp       |
| updated_by      | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record  |

#### Contraints
- Primary Key: id
- Unique: username, email
- Foreign Key: country_id -> COUNTRY.id

#### Triggers
- user_before_insert: Sets creation/update metadata before insert

#### Example
| id | username     | email           | password_hash | birth_date | genre_id | country_id | last_login |
|----|--------------|-----------------|---------------|------------|----------|------------|------------|
| 1  | "admin"      | "test@test.com" | "hash"        | 1990-01-01 | 1        | 1          | 2024-09-15 |
| 2  | "VongoSanDi" | "test@test.com" | "hash"        | 1990-01-01 | 2        | 1          | 2023-11-29 |

<a id="serie"></a>
### SERIE
#### Description
Stores the serie details.

#### Columns
| Name                     | Type               | NULL | Default            |Description                    |
|--------------------------|--------------------|------|--------------------|-------------------------------|
| id                       | BIGINT UNSIGNED    | No   | AUTO_INCREMENT     | Primary key                   |
| serie_name               | VARCHAR(255)       | No   | No                 | Name of the serie             |
| author_id                | MEDIUMINT UNSIGNED | No   | No                 | Id of the author              |
| status_id                | TINYINT UNSIGNED   | No   | No                 | Id of the status              |
| genre_id                 | TINYINT UNSIGNED   | Yes  | No                 | Id of the genre               |
| publisher_id             | SMALLINT UNSIGNED  | Yes  | No                 | Id of the publisher           |
| original_language_id     | TINYINT UNSIGNED   | No   | No                 | Id of the original language   |
| original_volumes_count   | TINYINT UNSIGNED   | Yes  | No                 | Original volumes count        |
| translated_volumes_count | TINYINT UNSIGNED   | Yes  | No                 | Translated volumes count      |
| publication_start_date   | DATE               | No   | No                 | Date start of the publication |
| publication_end_date     | DATE               | Yes  | No                 | End date of the publication   |
| description              | TEXT COMPRESSED    | Yes  | 0                  | Description of the serie      |
| created_at               | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp     |
| created_by               | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record    |
| updated_at               | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp         |
| updated_by               | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record    |

#### Contraints
- Primary Key: id
- Foreign Key: author_id -> AUTHOR.id, status_id -> STATUS.id, genre_id -> GENRE.id, publisher_id -> PUBLISHER.id, original_language_id -> LANGUAGE.id

#### Example
| id | serie_name    | author_id | status_id | genre_id | publisher_id | original_language_id | original_volumes_count | translated_volumes_count | publication_start_date | publication_end_date | description   |
|----|---------------|-----------|-----------|----------|--------------|----------------------|------------------------|--------------------------|------------------------|----------------------|---------------|
| 1  | "Dragon Ball" | 1         | 2         | 1        | 1            | 1                    | 90                     | 90                       | 1990-06-11             | 2007-10-27           | "durago ball" |
| 2  | "One Piece"   | 2         | 1         | 1        | 2            | 1                    | 110                    | 108                      | 1999-01-17             |                      | "one pisu"    |

<a id="book"></a>
### BOOK
#### Description
Store the book informations, this table contains the common informations of the book, it's the volume that contains the more specific informations

#### Columns
| Name                 | Type               | NULL | Default            |Description                       |
|----------------------|--------------------|------|--------------------|----------------------------------|
| id                   | BIGINT UNSIGNED    | No   | AUTO_INCREMENT     | Primary key                      |
| isbn                 | VARCHAR(13)        | No   | No                 | ISBN code of the book            |
| serie_id             | BIGINT UNSIGNED    | No   | No                 | Id of the serie                  |
| original_title       | VARCHAR(255)       | No   | No                 | Original title of the book       |
| original_language_id | TINYINT UNSIGNED   | No   | No                 | Original language id             |
| book_number          | TINYINT UNSIGNED   | No   | No                 | Book number in the serie         |
| type_id              | TINYINT UNSIGNED   | No   | No                 | Id of the type                   |
| author_id            | MEDIUMINT UNSIGNED | No   | No                 | Id of the author                 |
| publisher_id         | SMALLINT UNSIGNED  | No   | No                 | Id of the publisher              |
| edition_id           | TINYINT UNSIGNED   | No   | No                 | Id of the edition                |
| release_date         | DATE               | No   | No                 | Date of the local release        |
| release_price        | DECIMAL(10, 2)     | No   | No                 | Price at the date of the release |
| currency_id          | TINYINT UNSIGNED   | No   | No                 | Id of the currency               |
| page_count           | SMALLINT UNSIGNED  | No   | No                 | Number of  pages in the book     |
| image_url            | VARCHAR(255)       | No   | No                 | URL to the image                 |
| description          | TEXT COMPRESSED    | Yes  | No                 | Description of the serie         |
| created_at           | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp        |
| created_by           | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record       |
| updated_at           | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp            |
| updated_by           | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record       |

#### Contraints
- Primary Key: id
- Foreign Key: serie_id -> SERIE.id, type_id -> TYPE.id, author_id -> AUTHOR.id, publisher_id -> PUBLISHER.id, edition_id -> EDITION.id, currency_id -> CURRENCY.id, original_language_id -> LANGUAGE.id

#### Example
| id | isbn          | serie_id | original_title     | original_language_id | book_number | type_id | author_id | publisher_id | edition_id | release_date | release_price | currency_id | page_count | image_url | description |
|----|---------------|----------|--------------------|----------------------|-------------|---------|-----------|--------------|------------|--------------|---------------|-------------|------------|-----------|-------------|
| 1  | 9784088511699 | 1        | "ドラゴンボール 1" | 1                    | 1           | 1       | 2         | 1            | 1          | 1998-08-17   | 199           | 2           | 176        | "http"    | "blabla"
| 2  | 9784088511705 | 2        | "ONE PIECE 1"      | 1                    | 1           | 1       | 1         | 1            | 1          | 1999-01-16   | 199           | 2           | 153        | "http"    | "blabla"

<a id="volume"></a>
### VOLUME
#### Description
Store the volumes informations, it contains the specific, meaning local informations of the volumes

#### Columns
| Name              | Type               | NULL | Default            |Description                     |
|-------------------|--------------------|------|--------------------|--------------------------------|
| id                | BIGINT UNSIGNED    | No   | AUTO_INCREMENT     | Primary key                    |
| book_id           | BIGINT UNSIGNED    | No   | No                 | Id of the reference book       |
| language_id       | TINYINT UNSIGNED   | No   | No                 | Id of the language             |
| translated_title  | VARCHAR(255)       | No   | No                 | Translated title of the volume |
| acquisition_price | DECIMAL(10, 2)     | Yes  | No                 | Price the user paid the volume |
| currency_id       | TINYINT UNSIGNED   | Yes  | No                 | Id of the currency used to pay |
| acquisition_date  | DATE               | No   | No                 | Date of the acquisition        |
| created_at        | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp      |
| created_by        | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record     |
| updated_at        | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp          |
| updated_by        | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record     |

#### Contraints
- Primary Key: id
- Foreign Key: book_id -> BOOK.id, language_id -> LANGUAGE.id, currency_id -> CURRENCY.id

#### Example
| id | book_id | language_id | translated_title | acquisition_price | currency_id | acquisition_date |
|----|---------|-------------|------------------|-------------------|-------------|------------------|
| 1  | 1       | 1           | "Dragon Ball 1"  | 7.80              | 1           | 2024-09-14       |
| 2  | 2       | 2           | "One Piece 1"    | 5                 | 1           | 2021-12-25       |

<a id="box_set"></a>
### BOX_SET
#### Description
Store the informations of the box set

#### Columns
| Name                   | Type               | NULL | Default            |Description                                    |
|------------------------|--------------------|------|--------------------|-----------------------------------------------|
| id                     | BIGINT UNSIGNED    | No   | AUTO_INCREMENT     | Primary key                                   |
| isbn                   | VARCHAR(13)        | No   | No                 | Numeric commercial book identifier            |
| original_box_set_title | VARCHAR(255)       | No   | No                 | Original title                                |
| language_id            | TINYINT UNSIGNED   | No   | No                 | Id of the language                            |
| serie_id               | BIGINT UNSIGNED    | Yes  | No                 | Id of the serie                               |
| author_id              | MEDIUMINT UNSIGNED | Yes  | No                 | Id of the author                              |
| publisher_id           | SMALLINT UNSIGNED  | No   | No                 | Id of the publisher                           |
| release_date           | DATE               | No   | No                 | Date of the release                           |
| release_price          | DECIMAL(10, 2)     | No   | No                 | Price at the date of the release              |
| currency_id            | TINYINT UNSIGNED   | No   | No                 | Id of the currency at the date of the release |
| image_url              | VARCHAR(255)       | No   | No                 | URL of the image                              |
| description            | TEXT               | Yes  | No                 | Description                                   |
| created_at             | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp                     |
| created_by             | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record                    |
| updated_at             | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp                         |
| updated_by             | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record                    |

#### Contraints
- Primary Key: id
- Foreign Key: serie_id -> SERIE.id, author_id -> AUTHOR.id, publisher_id -> PUBLISHER.id, currency_id -> CURRENCY.id

#### Example
| id | isbn          | original_box_set_title |language_id | serie_id | author_id   | publisher_id | release_date | release_price | currency_id | image_url | description |
|----|---------------|------------------------|------------|----------|-------------|--------------|--------------|---------------|-------------|-----------|-------------|
| 1  | 9782723488525 | "Dragon Ball Coffret"  | 1          | 1        | 1           | 1            | 2022-02-26   | 21.99         | 1           |"http"     | "blabla"

<a id="box_set_book"></a>
### BOX_SET_BOOK
#### Description
Store the relation between the set and the books inside since a box can contain multiple books

#### Columns
| Name         | Type               | NULL | Default | Description                                   |
|--------------|--------------------|------|---------|-----------------------------------------------|
| box_set_id   | SMALLINT UNSIGNED  | No   | No      | Primary key                                   |
| book_id      | BIGINT UNSIGNES    | No   | No      | Primary Key                                   |

#### Contraints
- Primary Key: (box_set_id, book_id)

#### Example
| id | box_set_id | book_id |
|----|------------|---------|
| 1  | 1          | 1       |

<a id="collection"></a>
### COLLECTION
#### Description
Store the collection informations of the user

#### Columns
| Name          | Type               | NULL | Default            |Description                                    |
|---------------|--------------------|------|--------------------|-----------------------------------------------|
| id            | MEDIUMINT UNSIGNED | No   | AUTO_INCREMENT     | Primary key                                   |
| user_id       | MEDIUMINT UNSIGNED | No   | No                 | Id of the user, owner of the collection       |
| name          | VARCHAR(100)       | Yes  | No                 | Name of the collection                        |
| created_at    | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp                     |
| created_by    | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record                    |
| updated_at    | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp                         |
| updated_by    | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record                    |

#### Contraints
- Primary Key: id
- Foreign Key: user_id -> USER.id

#### Example
| id | user_id | name                    |
|----|---------|-------------------------|
| 1  | 1       | "VongoSanDi collection" |

<a id="collection_volume"></a>
### COLLECTION_VOLUME
#### Description
Store the relation between the collection and the volumes since a collection contains many volumes

#### Columns
| Name          | Type               | NULL | Default    |Description                         |
|---------------|--------------------|------|------------|------------------------------------|
| collection_id | MEDIUMINT UNSIGNED | No   | No         | Id of the collection               |
| volume_id     | BIGINT UNSIGNED    | No   | No         | Id of the volume                   |
| added_date    | DATE               | No   | No         | Date at which the volume was added |

#### Contraints
- Primary Key: (collection_id, volume_id)

#### Example
| collection_id | volume_id | added_date |
|---------------|-----------|------------|
| 1             | 1         | 2024-01-11 |

<a id="favorites"></a>
### Favorites
#### Description
It stocks the user favorites options

## VIEWS
### user_collection
#### Description
This view provide a consolidated view of the user collection

#### Columns
- id (USER.id)
- username (USER.username)
- serie_name (SERIE.serie_name)
- book_number (BOOK.book_number)
- original_title (BOOK.original_title)
- translated_title (VOLUME.translated_title)
- author (AUTHOR.pen_name)
- acquisition_date (VOLUME.acquisition_date)
- acquisition_price (VOLUME.acquisition_price)
- currency_symbol (CURRENCY.currency_symbol)

### statistics


# Relationship
## ERD Diagram
https://dbdiagram.io/d/Libraria-64d8109a02bd1c4a5eaec316

# Security
## Roles & permission
- test: used for the Unit Testing
- admin ?

# Maintenance
## Backup procedure

## Archiving
