-- Début de la transaction
START TRANSACTION;

-- Pays (nécessaire pour USER et autres tables)
INSERT INTO COUNTRY (id, country_name, iso_code ) VALUES 
(1, 'France', 'FR'),
(2, 'Japan', 'JP'),
(3, 'United States', 'US'),
(4, 'South Korea', 'KR');

-- Devises
INSERT INTO CURRENCY (id, currency_name, currency_symbol, iso_code) VALUES
(1, 'Euro', 'EUR', 'EUR'),
(2, 'Japanese Yen', 'JPY', 'JPY'),
(3, 'US Dollar', 'USD', 'USD'),
(4, 'Korean Won', 'KRW', 'KRW');

-- Langues
INSERT INTO LANGUAGE (id, language_name, iso_code) VALUES
(1, 'French', 'FR'),
(2, 'Japanese', 'JA'),
(3, 'English', 'EN'),
(4, 'Korean', 'KO');

-- Genres
INSERT INTO GENRE (id, genre_name) VALUES
(1, 'Shonen'),
(2, 'Seinen'),
(3, 'Shojo'),
(4, 'Josei'),
(5, 'Kodomo');

-- Types
INSERT INTO TYPE (id, type_name) VALUES
(1, 'Manga'),
(2, 'Light Novel'),
(3, 'One Shot'),
(4, 'Manhwa');

-- Éditions
INSERT INTO EDITION (id, edition_name) VALUES
(1, 'Standard'),
(2, 'Collector'),
(3, 'Digital'),
(4, 'Perfect');

-- Statuts
INSERT INTO STATUS (id, status_code) VALUES
(1, 'ONGOING'),
(2, 'COMPLETED'),
(3, 'HIATUS'),
(4, 'CANCELLED');

-- Utilisateurs (commencer par admin car référencé comme created_by)
INSERT INTO USER (id, username, email, password_hash, birth_date, country_id, last_login, created_by, updated_by) VALUES
(1, 'admin', 'admin@bibliotheca.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vYKHLOS', '1990-01-01', 1, '2024-01-01', 1, 1),
(2, 'john_doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vYKHLOS', '1995-05-15', 1, '2024-01-02', 1, 1),
(3, 'jane_doe', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vYKHLOS', '1992-08-23', 2, '2024-01-03', 1, 1);

-- Auteurs
INSERT INTO AUTHOR (id, last_name, first_name, pen_name, country_id, biography) VALUES
(1, 'Toriyama', 'Akira', 'Toriyama Akira', 2, 'Créateur de Dragon Ball'),
(2, 'Oda', 'Eiichiro', 'Oda Eiichiro', 2, 'Créateur de One Piece'),
(3, 'Horikoshi', 'Kohei', 'Horikoshi Kohei', 2, 'Créateur de My Hero Academia');

-- Éditeurs
INSERT INTO PUBLISHER (id, publisher_name, website, country_id) VALUES
(1, 'Glénat', 'https://www.glenat.com', 1),
(2, 'Shueisha', 'https://www.shueisha.co.jp', 2),
(3, 'Ki-oon', 'https://www.ki-oon.com', 1);

-- Séries
INSERT INTO SERIE (id, serie_title, author_id, status_id, genre_id, publisher_id, original_language_id,
                  original_volumes_count, translated_volumes_count, publication_start_date, publication_end_date,
                  description, created_by, updated_by) VALUES
(1, 'Dragon Ball', 1, 2, 1, 2, 2, 42, 42, '1984-11-20', '1995-05-23',
   'L''histoire de Son Goku', 1, 1),
(2, 'One Piece', 2, 1, 1, 2, 2, 105, 102, '1997-07-22', NULL,
   'L''aventure de Luffy', 1, 1),
(3, 'My Hero Academia', 3, 1, 1, 2, 2, 38, 35, '2014-07-07', NULL,
   'Dans un monde de super-héros', 1, 1);

-- Livres
INSERT INTO BOOK (id, isbn, original_title, original_language_id, book_number, serie_id, type_id,
                 author_id, publisher_id, edition_id, release_date, release_price, currency_id,
                 page_count, image_url, description, created_by, updated_by) VALUES
(1, '9784088511699', 'ドラゴンボール 1', 2, 1, 1, 1, 1, 2, 1, '1985-09-10', 400, 2, 192,
   'https://example.com/dragonball-1.jpg', 'Premier tome de Dragon Ball', 1, 1),
(2, '9784088511705', 'ドラゴンボール 2', 2, 2, 1, 1, 1, 2, 1, '1985-11-10', 400, 2, 192,
   'https://example.com/dragonball-2.jpg', 'Deuxième tome de Dragon Ball', 1, 1),
(3, '9784088725093', 'ONE PIECE 1', 2, 1, 2, 1, 2, 2, 1, '1997-12-24', 400, 2, 208,
   'https://example.com/onepiece-1.jpg', 'Premier tome de One Piece', 1, 1);

-- Volumes (exemplaires physiques)
INSERT INTO VOLUME (id, book_id, language_id, acquisition_price, currency_id,
                   acquisition_date, created_by, updated_by) VALUES
(1, 1, 1, 6.90, 1, '2023-01-15', 1, 1),
(2, 1, 1, 6.90, 1, '2023-01-15', 1, 1),
(3, 2, 1, 6.90, 1, '2023-02-01', 1, 1),
(4, 3, 1, 6.90, 1, '2023-03-10', 1, 1);

-- Box Sets
INSERT INTO BOX_SET (id, isbn, original_box_set_title, language_id, serie_id, author_id, publisher_id,
                    release_date, release_price, currency_id, image_url, description, created_by, updated_by) VALUES
(1, '9782723488525', 'Dragon Ball Coffret', 1, 1, 1, 1, '2023-05-01', 29.90, 1,
   'https://example.com/dragonball-box.jpg', 'Coffret des deux premiers tomes de Dragon Ball', 1, 1);

-- Contenu des Box Sets
INSERT INTO BOX_SET_BOOK (box_set_id, book_id) VALUES
(1, 1),
(1, 2);

-- Collections
INSERT INTO COLLECTION (id, user_id, name, created_by, updated_by) VALUES
(1, 2, 'Collection de John', 1, 1),
(2, 3, 'Collection de Jane', 1, 1);

-- Volumes dans les collections
INSERT INTO COLLECTION_VOLUME (collection_id, volume_id) VALUES
(1, 1),  -- John possède Dragon Ball tome 1
(1, 3),  -- John possède Dragon Ball tome 2
(2, 2),  -- Jane possède Dragon Ball tome 1
(2, 4);  -- Jane possède One Piece tome 1

INSERT INTO BOOK_TITLE_TRANSLATION(id, book_id, translated_title, language_id) VALUES
(1, 1, 'Dragon Ball 1', 1),
(2, 2, 'Dragon Ball 2', 3),
(3, 1, 'One Piece 1', 1);

INSERT INTO SERIE_TITLE_TRANSLATION(id, serie_id, translated_title, language_id) VALUES
(1, 1, 'Dragon Ball', 1),
(2, 2, 'One Piece', 1),
(3, 2, 'One Piece', 2),
(4, 3, 'My Hero Academia', 1);

COMMIT;
