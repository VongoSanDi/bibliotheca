-- AUTHOR, BOOK, BOOK_SET, BOOK_SET_VOLUME, COLLECTION, COLLECTION_VOLUME, COUNTRY, CURRENCY, EDITION, GENRE, LANGUAGE, PUBLISHER, SERIE, STATUS, USER, VOLUME, TYPE
-- Reference tables
CREATE TABLE COUNTRY (
    country_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(50) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL UNIQUE,
    INDEX idx_country_iso (iso_code)
);

CREATE TABLE CURRENCY (
    currency_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    currency_name VARCHAR(50) NOT NULL UNIQUE,
    currency_symbol CHAR(3) NOT NULL,
    iso_code CHAR(3) NOT NULL UNIQUE,
    INDEX idx_currency_iso (iso_code)
);

CREATE TABLE LANGUAGE (
    language_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    language_name VARCHAR(50) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL UNIQUE,
    INDEX idx_language_iso (iso_code)
);

CREATE TABLE GENRE (
    genre_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE TYPE (
    type_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE EDITION (
    edition_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    edition_name VARCHAR(50) NOT NULL
);

CREATE TABLE STATUS (
    status_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status_code VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique code for client-side translations'
);

-- Main tables
CREATE TABLE USER (
    user_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    birth_date DATE,
    gender_id TINYINT UNSIGNED,
    country_id TINYINT UNSIGNED NOT NULL,
    last_login DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id)
);

CREATE TABLE AUTHOR (
    author_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    pen_name VARCHAR(100) NOT NULL,
    country_id TINYINT UNSIGNED NOT NULL,
    biography TEXT COMPRESSED,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id)
);

CREATE TABLE PUBLISHER (
    publisher_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    publisher_name VARCHAR(100) NOT NULL UNIQUE,
    website VARCHAR(255),
    country_id TINYINT UNSIGNED,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id)
);

CREATE TABLE SERIE (
    serie_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    serie_name VARCHAR(255) NOT NULL COMMENT 'Original title of the serie',
    author_id MEDIUMINT UNSIGNED NOT NULL,
    status_id TINYINT UNSIGNED NOT NULL,
    genre_id TINYINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    original_language_id TINYINT UNSIGNED NOT NULL COMMENT 'Original language of the serie',
    original_volumes_count TINYINT UNSIGNED,
    translated_volumes_count TINYINT UNSIGNED,
    publication_start_date DATE NOT NULL,
    publication_end_date DATE,
    description TEXT COMPRESSED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (author_id) REFERENCES AUTHOR(author_id),
    FOREIGN KEY (status_id) REFERENCES STATUS(status_id),
    FOREIGN KEY (genre_id) REFERENCES GENRE(genre_id),
    FOREIGN KEY (publisher_id) REFERENCES PUBLISHER(publisher_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id),
    FOREIGN KEY (original_language_id) REFERENCES LANGUAGE(language_id)
);

-- LIVRE, permet de gérer un livre dans plusieurs langue, différentes édition ...
-- It contains the general informations on a book
CREATE TABLE BOOK (
    book_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    original_title VARCHAR(255) NOT NULL COMMENT 'Original title of the book',
    original_language_id TINYINT UNSIGNED NOT NULL COMMENT 'Original language of the book',
    book_number TINYINT UNSIGNED NOT NULL,
    serie_id BIGINT UNSIGNED NOT NULL,
    type_id TINYINT UNSIGNED NOT NULL,
    author_id MEDIUMINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    edition_id TINYINT UNSIGNED NOT NULL,
    release_date DATE NOT NULL,
    release_price DECIMAL(10,2) NOT NULL,
    currency_id TINYINT UNSIGNED NOT NULL,
    page_count SMALLINT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT COMPRESSED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (serie_id) REFERENCES SERIE(serie_id),
    FOREIGN KEY (type_id) REFERENCES TYPE(type_id),
    FOREIGN KEY (author_id) REFERENCES AUTHOR(author_id),
    FOREIGN KEY (publisher_id) REFERENCES PUBLISHER(publisher_id),
    FOREIGN KEY (edition_id) REFERENCES EDITION(edition_id),
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(currency_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id),
    FOREIGN KEY (original_language_id) REFERENCES LANGUAGE(language_id)
);

-- TOME
CREATE TABLE VOLUME (
    volume_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    book_id BIGINT UNSIGNED NOT NULL,
    language_id TINYINT UNSIGNED NOT NULL,
    translated_title VARCHAR(255) NOT NULL,
    acquisition_price DECIMAL(10,2),
    currency_id TINYINT UNSIGNED,
    acquisition_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (book_id) REFERENCES BOOK(book_id) ON DELETE RESTRICT,
    FOREIGN KEY (language_id) REFERENCES LANGUAGE(language_id) ON DELETE RESTRICT,
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(currency_id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE BOX_SET (
    box_set_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    original_box_set_title VARCHAR(255) NOT NULL,
    language_id TINYINT UNSIGNED NOT NuLL,
    serie_id BIGINT UNSIGNED NOT NULL,
    author_id MEDIUMINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    release_date DATE NOT NULL,
    release_price DECIMAL(10,2),
    currency_id TINYINT UNSIGNED,
    image_url VARCHAR(255) NOT NULL,
    description TEXT COMPRESSED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(currency_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE BOX_SET_BOOK (
    box_set_id SMALLINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (box_set_id, book_id),
    FOREIGN KEY (box_set_id) REFERENCES BOX_SET(box_set_id),
    FOREIGN KEY (book_id) REFERENCES BOOK(book_id)
);

CREATE TABLE COLLECTION (
    collection_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

-- Joint table for the volumes of the collection
CREATE TABLE COLLECTION_VOLUME (
    collection_id MEDIUMINT UNSIGNED NOT NULL,
    volume_id BIGINT UNSIGNED NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (collection_id, volume_id),
    FOREIGN KEY (collection_id) REFERENCES COLLECTION(collection_id) ON DELETE CASCADE,
    FOREIGN KEY (volume_id) REFERENCES VOLUME(volume_id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_book_isbn ON BOOK(isbn);
CREATE INDEX idx_serie_name ON SERIE(serie_name);
CREATE INDEX idx_user_username ON USER(username);
CREATE INDEX idx_book_author ON BOOK(author_id);
CREATE INDEX idx_book_publisher ON BOOK(publisher_id);
CREATE INDEX idx_collection_user ON COLLECTION(user_id);
CREATE INDEX idx_volume_book ON VOLUME(book_id);
CREATE INDEX idx_collection_volume_collection ON COLLECTION_VOLUME(collection_id);
CREATE INDEX idx_collection_volume_volume ON COLLECTION_VOLUME(volume_id);

-- I just need 1 trigger for the user table, since when creating the user, i don't have an user_id yet
-- For the other tables, since the users will always be logged in, i will always provide the user_id
DROP TRIGGER IF EXISTS user_after_insert;

DELIMITER //

CREATE TRIGGER user_before_insert 
BEFORE INSERT ON `USER`
FOR EACH ROW
BEGIN
    SET NEW.created_at = CURRENT_TIMESTAMP;
    SET NEW.updated_at = CURRENT_TIMESTAMP;
    -- We use the next auto incremented value the same used for the user_id
    SET @next_id = (SELECT AUTO_INCREMENT 
                    FROM information_schema.TABLES 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = 'USER');
    SET NEW.created_by = @next_id;
    SET NEW.updated_by = @next_id;
END;
//

DELIMITER ;

CREATE USER 'test'@localhost IDENTIFIED BY 'test';
