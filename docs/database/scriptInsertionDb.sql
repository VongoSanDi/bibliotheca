-- Début de la transaction
START TRANSACTION;

-- Pays
INSERT INTO COUNTRY (country_id, country_name, iso_code, created_by, updated_by) VALUES 
(1, 'France', 'FR', 1, 1),
(2, 'Japan', 'JP', 1, 1),
(3, 'United States', 'US', 1, 1);

-- Devises
INSERT INTO CURRENCY (currency_id, currency_name, currency_symbol, iso_code, created_by, updated_by) VALUES
(1, 'Euro', 'EUR', 'EUR', 1, 1),
(2, 'Japanese Yen', 'JPY', 'JPY', 1, 1),
(3, 'US Dollar', 'USD', 'USD', 1, 1);

-- Langues
INSERT INTO LANGUAGE (language_id, language_name, iso_code, created_by, updated_by) VALUES
(1, 'French', 'FR', 1, 1),
(2, 'Japanese', 'JA', 1, 1),
(3, 'English', 'EN', 1, 1);

-- Genres
INSERT INTO GENRE (genre_id, genre_name, created_by, updated_by) VALUES
(1, 'Shonen', 1, 1),
(2, 'Seinen', 1, 1),
(3, 'Shojo', 1, 1),
(4, 'Josei', 1, 1);

-- Types
INSERT INTO TYPE (type_id, type_name, created_by, updated_by) VALUES
(1, 'Manga', 1, 1),
(2, 'Light Novel', 1, 1),
(3, 'One Shot', 1, 1);

-- Éditions
INSERT INTO EDITION (edition_id, edition_name, created_by, updated_by) VALUES
(1, 'Standard', 1, 1),
(2, 'Collector', 1, 1),
(3, 'Digital', 1, 1);

-- Statuts
INSERT INTO STATUS (status_id, status_code, created_by, updated_by) VALUES
(1, 'ONGOING', 1, 1),
(2, 'COMPLETED', 1, 1),
(3, 'HIATUS', 1, 1),
(4, 'CANCELLED', 1, 1);

-- Utilisateurs (on commence par l'admin car il est référencé comme created_by/updated_by)
INSERT INTO USER (user_id, username, email, password_hash, birth_date, country_id, created_by, updated_by, last_login) VALUES
(1, 'admin', 'admin@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vYKHLOS', '1990-01-01', 1, 1, 1, '2024-01-01'),
(2, 'john_doe', 'john@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vYKHLOS', '1995-05-15', 1, 1, 1, '2024-01-02'),
(3, 'jane_doe', 'jane@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vYKHLOS', '1992-08-23', 2, 1, 1, '2024-01-03');

-- Auteurs
INSERT INTO AUTHOR (author_id, last_name, first_name, pen_name, country_id, biography, created_by, updated_by) VALUES
(1, 'Toriyama', 'Akira', 'Toriyama Akira', 2, 'Famous manga artist known for Dragon Ball series', 1, 1),
(2, 'Oda', 'Eiichiro', 'Oda Eiichiro', 2, 'Creator of One Piece', 1, 1),
(3, 'Urasawa', 'Naoki', 'Urasawa Naoki', 2, 'Creator of Monster and 20th Century Boys', 1, 1);

-- Éditeurs
INSERT INTO PUBLISHER (publisher_id, publisher_name, website, country_id, created_by, updated_by) VALUES
(1, 'Glénat', 'https://www.glenat.com', 1, 1, 1),
(2, 'Shueisha', 'https://www.shueisha.co.jp', 2, 1, 1),
(3, 'Viz Media', 'https://www.viz.com', 3, 1, 1);

-- Séries
INSERT INTO SERIE (serie_id, serie_name, author_id, status_id, genre_id, publisher_id, original_language_id,
                  original_volumes_count, translated_volumes_count, publication_start_date, publication_end_date, 
                  description, created_by, updated_by) VALUES
(1, 'Dragon Ball', 1, 2, 1, 2, 2, 42, 42, '1984-11-20', '1995-05-23', 
   'The story of Son Goku and his quest for the Dragon Balls', 1, 1),
(2, 'One Piece', 2, 1, 1, 2, 2, 104, 102, '1997-07-22', NULL,
   'The adventures of Monkey D. Luffy and his pirate crew', 1, 1),
(3, 'Monster', 3, 2, 2, 2, 2, 18, 18, '1994-12-05', '2001-12-20',
   'A psychological thriller about a brilliant surgeon', 1, 1);

-- Livres
INSERT INTO BOOK (book_id, isbn, original_title, original_language_id, book_number, serie_id, type_id, 
                 author_id, publisher_id, edition_id, release_date, release_price, currency_id, 
                 page_count, image_url, description, created_by, updated_by) VALUES
(1, '9784088511699', 'ドラゴンボール 1', 2, 1, 1, 1, 1, 2, 1, '1985-09-10', 400, 2, 192, 
   'https://example.com/dragonball-1.jpg', 'First volume of Dragon Ball', 1, 1),
(2, '9784088511705', 'ドラゴンボール 2', 2, 2, 1, 1, 1, 2, 1, '1986-01-10', 400, 2, 192,
   'https://example.com/dragonball-2.jpg', 'Second volume of Dragon Ball', 1, 1),
(3, '9784088725093', 'ワンピース 1', 2, 1, 2, 1, 2, 2, 1, '1997-12-24', 400, 2, 208,
   'https://example.com/onepiece-1.jpg', 'First volume of One Piece', 1, 1);

-- Volumes (exemplaires physiques)
INSERT INTO VOLUME (volume_id, book_id, language_id, translated_title, acquisition_price, currency_id, 
                   acquisition_date, created_by, updated_by) VALUES
(1, 1, 1, 'Dragon Ball Tome 1', 6.90, 1, '2023-01-15 10:00:00', 1, 1),
(2, 1, 1, 'Dragon Ball Tome 1', 6.90, 1, '2023-01-15 10:00:00', 1, 1),
(3, 2, 1, 'Dragon Ball Tome 2', 6.90, 1, '2023-02-01 14:30:00', 1, 1);

-- Collections (liens utilisateurs-volumes)
INSERT INTO COLLECTION (collection_id, volume_id, user_id, created_by, updated_by) VALUES
(1, 1, 2, 1, 1),
(1, 2, 1, 1, 1),
(2, 3, 2, 1, 1),
(3, 2, 3, 1, 1);

-- Coffrets
INSERT INTO BOX_SET (box_set_id, isbn, original_box_set_title, language_id, serie_id, author_id, publisher_id,
                    release_date, release_price, currency_id, image_url, description, created_by, updated_by) VALUES
(1, '9782723488525', 'Dragon Ball Complete Box', 1, 1, 1, 1, '2023-05-01', 129.90, 1,
   'https://example.com/dragonball-box.jpg', 'Complete Dragon Ball manga collection', 1, 1);

-- Contenu des coffrets
INSERT INTO BOX_SET_BOOK (box_set_id, book_id, created_by, updated_by) VALUES
(1, 1, 1, 1),
(1, 2, 1, 1);

COMMIT;
